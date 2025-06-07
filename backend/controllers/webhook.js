const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const prisma = require("../prisma/client");

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`⚠️  Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Procesar eventos
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      const userId = session.metadata?.userId;
      const planId = session.metadata?.planId;

      if (!userId || !planId) {
        console.warn("Faltan userId o planId en session metadata");
        break;
      }

      try {
        await prisma.user.update({
          where: { id: Number(userId) },
          data: {
            planId: Number(planId),
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            subscriptionStatus: "active",
          },
        });
        console.log(`✅ Usuario ${userId} suscrito correctamente.`);
      } catch (error) {
        console.error("Error actualizando usuario tras checkout:", error);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;

      try {
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            subscriptionStatus: subscription.status, // e.g., active, past_due, canceled
          },
        });
        console.log(
          `🔄 Suscripción ${subscription.id} actualizada: ${subscription.status}`
        );
      } catch (error) {
        console.error("Error actualizando estado de suscripción:", error);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;

      try {
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            planId: 1, // 👈 Plan gratuito, o como lo tengas definido
            subscriptionStatus: "canceled",
            stripeSubscriptionId: null,
          },
        });
        console.log(`🚫 Suscripción cancelada: ${subscription.id}`);
      } catch (error) {
        console.error("Error al cancelar suscripción:", error);
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;

      try {
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: {
            subscriptionStatus: "past_due",
          },
        });
        console.log(`❌ Pago fallido para suscripción ${subscriptionId}`);
      } catch (error) {
        console.error("Error al registrar pago fallido:", error);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};

module.exports = { handleStripeWebhook };
