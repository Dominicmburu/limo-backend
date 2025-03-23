const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
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
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('comment')
      .optional()
      .isString()
      .withMessage('Comment must be a string'),
  ],
  validateRequest,
  ReviewController.submitReview
);


router.get('/vehicle/:vehicle_id', ReviewController.getVehicleReviews);

module.exports = router;
