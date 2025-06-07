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

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;

        if (!userId || !planId) {
          console.warn("Faltan userId o planId en session metadata");
          break;
        }

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
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { subscriptionStatus: subscription.status },
        });
        console.log(
          `🔄 Suscripción ${subscription.id} actualizada: ${subscription.status}`
        );
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            planId: 1,
            subscriptionStatus: "canceled",
            stripeSubscriptionId: null,
          },
        });
        console.log(`🚫 Suscripción cancelada: ${subscription.id}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: { subscriptionStatus: "past_due" },
        });
        console.log(`❌ Pago fallido para suscripción ${subscriptionId}`);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log(`💰 PaymentIntent exitoso: ${paymentIntent.id}`);
        // Aquí podrías hacer algo extra si quieres
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object;
        console.log(`🆕 Suscripción creada: ${subscription.id}`);
        // Opcional: actualizar estado si quieres igual que en checkout.session.completed
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        console.log(`📄 Factura pagada correctamente: ${invoice.id}`);
        // Opcional: actualizar estado o lo que necesites
        break;
      }

      default:
        console.log(
          `Evento recibido pero sin manejo específico: ${event.type}`
        );
    }
  } catch (error) {
    console.error("Error procesando evento webhook:", error);
    return res.status(500).send("Error interno");
  }

  res.status(200).json({ received: true });
};

module.exports = { handleStripeWebhook };
