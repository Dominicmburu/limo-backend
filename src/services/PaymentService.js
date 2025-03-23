const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key');

class PaymentService {

  static async processPayment(amount, paymentMethodId) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
      });

      return paymentIntent;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PaymentService;
