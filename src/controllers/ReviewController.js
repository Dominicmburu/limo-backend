const { getRepository } = require('typeorm');
const { Review } = require('../entities/Review');
const { Vehicle } = require('../entities/Vehicle');

class ReviewController {

  static async submitReview(req, res, next) {
    const reviewRepository = getRepository(Review);
    const vehicleRepository = getRepository(Vehicle);
    const userId = req.userId;
    const { vehicle_id, rating, comment } = req.body;

    try {
      const vehicle = await vehicleRepository.findOne(vehicle_id);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }

      const review = reviewRepository.create({
        user_id: userId,
        vehicle_id,
        rating,
        comment,
      });

      await reviewRepository.save(review);

      res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (error) {
      next(error);
    }
  }

  static async getVehicleReviews(req, res, next) {
    const reviewRepository = getRepository(Review);
    const vehicleId = req.params.vehicle_id;

    try {
      const reviews = await reviewRepository.find({
        where: { vehicle_id: vehicleId },
        relations: ['user'],
      });

      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReviewController;
