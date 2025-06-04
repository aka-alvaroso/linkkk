const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require('../prisma/client');

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`⚠️  Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      const userId = paymentIntent.metadata.userId;
      const planId = paymentIntent.metadata.planId;

      if (userId && planId) {
        try {
          await prisma.user.update({
            where: { id: Number(userId) },
            data: { planId: Number(planId) },
          });
          console.log(`User ${userId} plan updated to ${planId} successfully.`);
        } catch (error) {
          console.error(`Error updating user plan for ${userId}:`, error);
          // Considera un sistema de reintentos o notificación de errores aquí
        }
      } else {
        console.warn('Missing userId or planId in PaymentIntent metadata.');
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};

module.exports = { handleStripeWebhook };