// backend/src/routes/vehicleRoutes.js

const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/VehicleController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');

router.get('/', VehicleController.getAllVehicles);


router.get('/:id', VehicleController.getVehicleById);


router.post(
  '/',
  authMiddleware,
  [
    body('make').notEmpty().withMessage('Make is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').isInt({ min: 1900 }).withMessage('Valid year is required'),
    body('license_plate')
      .notEmpty()
      .withMessage('License plate is required'),
    body('vehicle_type').notEmpty().withMessage('Vehicle type is required'),
    body('price_per_hour')
      .isDecimal({ decimal_digits: '0,2' })
      .withMessage('Valid price per hour is required'),
  ],
  validateRequest,
  VehicleController.addVehicle
);


router.put(
  '/:id',
  authMiddleware,
  [
    body('make').optional().notEmpty().withMessage('Make cannot be empty'),
    body('model').optional().notEmpty().withMessage('Model cannot be empty'),
    body('year')
      .optional()
      .isInt({ min: 1900 })
      .withMessage('Valid year is required'),
    body('license_plate')
      .optional()
      .notEmpty()
      .withMessage('License plate cannot be empty'),
    body('vehicle_type')
      .optional()
      .notEmpty()
      .withMessage('Vehicle type cannot be empty'),
    body('price_per_hour')
      .optional()
      .isDecimal({ decimal_digits: '0,2' })
      .withMessage('Valid price per hour is required'),
    body('availability_status')
      .optional()
      .isBoolean()
      .withMessage('Availability status must be a boolean'),
  ],
  validateRequest,
  VehicleController.updateVehicle
);

router.delete('/:id', authMiddleware, VehicleController.deleteVehicle);

module.exports = router;
