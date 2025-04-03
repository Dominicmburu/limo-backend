const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const AuthController = require('../controllers/AuthController');
const validateRequest = require('../middlewares/validateRequest');


router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('phone_number').notEmpty().withMessage('Phone number is required'),
    body('address').notEmpty().withMessage('Address is required'),
  ],
  validateRequest,
  AuthController.register
);


router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  AuthController.login
);


router.post(
  '/verify-otp',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  ],
  validateRequest,
  AuthController.verifyOtp
);


router.post('/logout', AuthController.logout);

module.exports = router;
