const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/ReservationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');


router.post(
  '/',
  authMiddleware,
  [
    body('vehicle_id')
      .isInt()
      .withMessage('Valid vehicle ID is required'),
    body('pickup_location')
      .notEmpty()
      .withMessage('Pickup location is required'),
    body('dropoff_location')
      .notEmpty()
      .withMessage('Dropoff location is required'),
    body('pickup_datetime')
      .isISO8601()
      .toDate()
      .withMessage('Valid pickup datetime is required'),
    body('dropoff_datetime')
      .isISO8601()
      .toDate()
      .withMessage('Valid dropoff datetime is required'),
    body('payment_method')
      .notEmpty()
      .withMessage('Payment method is required'),
  ],
  validateRequest,
  ReservationController.createReservation
);


router.get('/', authMiddleware, ReservationController.getUserReservations);


router.delete('/:id', authMiddleware, ReservationController.cancelReservation);

module.exports = router;
