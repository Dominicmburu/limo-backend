const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');

router.post(
  '/',
  authMiddleware,
  [
    body('reservation_id')
      .isInt()
      .withMessage('Valid reservation ID is required'),
    body('payment_method_id')
      .notEmpty()
      .withMessage('Payment method ID is required'),
  ],
  validateRequest,
  PaymentController.processPayment
);

router.get('/:id', authMiddleware, PaymentController.getPaymentDetails);

module.exports = router;
