const AppDataSource = require('../data-source');
const { Reservation } = require('../entities/Reservation');
const { Vehicle } = require('../entities/Vehicle');
const { Payment } = require('../entities/Payment');
const EmailService = require('../services/EmailService');

class ReservationController {

  static async createReservation(req, res, next) {
    try {
      const reservationRepository = AppDataSource.getRepository(Reservation);
      const vehicleRepository = AppDataSource.getRepository(Vehicle);
      const paymentRepository = AppDataSource.getRepository(Payment);

      const userId = req.userId;
      const userEmail = req.userEmail;
      const adminEmail = "Badomansouri20@gmail.com";

      const { vehicle_id, pickup_location, dropoff_location, pickup_datetime, dropoff_datetime, payment_method } = req.body;

      const vehicle = await vehicleRepository.findOneBy({ id: vehicle_id });
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
      if (!vehicle.availability_status) {
        return res.status(400).json({ message: 'Vehicle is not available for reservation' });
      }

      const pickupTime = new Date(pickup_datetime);
      const dropoffTime = new Date(dropoff_datetime);
      const durationInHours = Math.ceil((dropoffTime - pickupTime) / (1000 * 60 * 60));
      const total_cost = durationInHours * vehicle.price_per_hour;

      // Create reservation
      const reservation = reservationRepository.create({
        user: { id: userId },
        vehicle,
        pickup_location,
        dropoff_location,
        pickup_datetime,
        dropoff_datetime,
        total_cost,
        payment_status: 'Pending',
        reservation_status: 'Confirmed',
      });

      await reservationRepository.save(reservation);

      // Create payment record
      const payment = paymentRepository.create({
        reservation,
        amount: total_cost,
        payment_method,
        payment_status: 'Pending',
        transaction_id: null,
      });

      await paymentRepository.save(payment);

      vehicle.availability_status = false;
      await vehicleRepository.save(vehicle);

      const userEmailContent = `
        <h1>Reservation Confirmed</h1>
        <p>Dear ${userEmail},</p>
        <p>Your reservation has been successfully created!</p>
        <p><strong>Vehicle:</strong> ${vehicle.name} (${vehicle.model})</p>
        <p><strong>Pickup Location:</strong> ${pickup_location}</p>
        <p><strong>Dropoff Location:</strong> ${dropoff_location}</p>
        <p><strong>Pickup Date and Time:</strong> ${pickup_datetime}</p>
        <p><strong>Dropoff Date and Time:</strong> ${dropoff_datetime}</p>
        <p><strong>Total Cost:</strong> $${total_cost}</p>
        <p>Your payment is currently <strong>Pending</strong>.</p>
        <p>We will notify you once the payment is processed.</p>
        <p>Thank you for booking with us!</p>
      `;
      await EmailService.sendEmail(
        userEmail,
        'Your Reservation is Confirmed',
        'Your reservation has been confirmed!',
        userEmailContent
      );

      const adminEmailContent = `
        <h1>New Vehicle Reservation</h1>
        <p>A new reservation has been created.</p>
        <p><strong>User Name:</strong> ${userEmail}</p>
        <p><strong>Vehicle:</strong> ${vehicle.name} (${vehicle.model})</p>
        <p><strong>Pickup Location:</strong> ${pickup_location}</p>
        <p><strong>Dropoff Location:</strong> ${dropoff_location}</p>
        <p><strong>Pickup Date and Time:</strong> ${pickup_datetime}</p>
        <p><strong>Dropoff Date and Time:</strong> ${dropoff_datetime}</p>
        <p><strong>Total Cost:</strong> $${total_cost}</p>
        <p><strong>Payment Method:</strong> ${payment_method}</p>
        <p>Please ensure the payment is processed and update the status accordingly.</p>
      `;

      await EmailService.sendEmail(
        adminEmail,
        'New Reservation Created',
        'A new vehicle reservation has been created!',
        adminEmailContent
      );

      res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
      console.error('Error creating reservation:', error);
      next(error);
    }
  }

  static async getUserReservations(req, res, next) {
    try {
      const reservationRepository = AppDataSource.getRepository(Reservation);
      const userId = req.userId;

      const reservations = await reservationRepository.find({
        where: { user: { id: userId } },
        relations: ['vehicle', 'payment'],
      });

      res.status(200).json(reservations);
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      next(error);
    }
  }

  static async cancelReservation(req, res, next) {
    try {
      const reservationRepository = AppDataSource.getRepository(Reservation);
      const vehicleRepository = AppDataSource.getRepository(Vehicle);

      const reservationId = req.params.id;
      const userId = req.userId;

      const reservation = await reservationRepository.findOne({
        where: { id: reservationId },
        relations: ['vehicle'],
      });

      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      if (reservation.user.id !== userId) {
        return res.status(403).json({ message: 'Unauthorized to cancel this reservation' });
      }

      if (reservation.reservation_status === 'Cancelled') {
        return res.status(400).json({ message: 'Reservation is already cancelled' });
      }

      reservation.reservation_status = 'Cancelled';
      await reservationRepository.save(reservation);

      const vehicle = reservation.vehicle;
      vehicle.availability_status = true;
      await vehicleRepository.save(vehicle);

      res.status(200).json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      next(error);
    }
  }
}

module.exports = ReservationController;
