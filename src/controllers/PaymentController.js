const { getRepository } = require('typeorm');
const { Payment } = require('../entities/Payment');
const { Reservation } = require('../entities/Reservation');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key');

class PaymentController {
  static async processPayment(req, res, next) {
    const paymentRepository = getRepository(Payment);
    const reservationRepository = getRepository(Reservation);
    const { reservation_id, payment_method_id } = req.body;

    try {
      const reservation = await reservationRepository.findOne(reservation_id);
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      if (reservation.payment_status === 'Completed') {
        return res.status(400).json({ message: 'Payment has already been completed for this reservation' });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(reservation.total_cost * 100), // Convert to cents
        currency: 'usd',
        payment_method: payment_method_id,
        confirm: true,
      });

      const payment = await paymentRepository.findOne({ where: { reservation_id } });
      if (!payment) {
        return res.status(404).json({ message: 'Payment record not found' });
      }

      payment.payment_status = 'Completed';
      payment.transaction_id = paymentIntent.id;
      await paymentRepository.save(payment);

      reservation.payment_status = 'Completed';
      await reservationRepository.save(reservation);

      res.status(200).json({ message: 'Payment processed successfully', paymentIntent });
    } catch (error) {
      if (error.type === 'StripeCardError') {
        return res.status(400).json({ message: error.message });
      }
      next(error);
    }
  }

  static async getPaymentDetails(req, res, next) {
    const paymentRepository = getRepository(Payment);
    const paymentId = req.params.id;

    try {
      const payment = await paymentRepository.findOne(paymentId, { relations: ['reservation'] });
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }

      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
