const express = require('express');
const router = express.Router();
const PromotionController = require('../controllers/PromotionController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');


router.get('/', PromotionController.getAllPromotions);


router.post(
  '/',
  authMiddleware,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('discount_percentage')
      .isDecimal({ decimal_digits: '0,2' })
      .withMessage('Valid discount percentage is required'),
    body('start_date')
      .isISO8601()
      .toDate()
      .withMessage('Valid start date is required'),
    body('end_date')
      .isISO8601()
      .toDate()
      .withMessage('Valid end date is required'),
  ],
  validateRequest,
  PromotionController.addPromotion
);

router.put(
  '/:id',
  authMiddleware,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('discount_percentage')
      .optional()
      .isDecimal({ decimal_digits: '0,2' })
      .withMessage('Valid discount percentage is required'),
    body('start_date')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('Valid start date is required'),
    body('end_date')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('Valid end date is required'),
  ],
  validateRequest,
  PromotionController.updatePromotion
);

router.delete('/:id', authMiddleware, PromotionController.deletePromotion);

module.exports = router;
