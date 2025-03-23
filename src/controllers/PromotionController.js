const { getRepository } = require('typeorm');
const { Promotion } = require('../entities/Promotion');

class PromotionController {

  static async getAllPromotions(req, res, next) {
    const promotionRepository = getRepository(Promotion);

    try {
      const promotions = await promotionRepository.find({
        where: { 
          start_date: () => "CURRENT_DATE <= end_date"
        },
        order: { start_date: 'DESC' }
      });

      res.status(200).json(promotions);
    } catch (error) {
      next(error);
    }
  }

  static async addPromotion(req, res, next) {
    const promotionRepository = getRepository(Promotion);
    const { title, description, discount_percentage, start_date, end_date } = req.body;

    try {
      const promotion = promotionRepository.create({
        title,
        description,
        discount_percentage,
        start_date,
        end_date,
      });

      await promotionRepository.save(promotion);

      res.status(201).json({ message: 'Promotion added successfully', promotion });
    } catch (error) {
      next(error);
    }
  }


  static async updatePromotion(req, res, next) {
    const promotionRepository = getRepository(Promotion);
    const promotionId = req.params.id;
    const { title, description, discount_percentage, start_date, end_date } = req.body;

    try {
      const promotion = await promotionRepository.findOne(promotionId);
      if (!promotion) {
        return res.status(404).json({ message: 'Promotion not found' });
      }

      if (title) promotion.title = title;
      if (description) promotion.description = description;
      if (discount_percentage) promotion.discount_percentage = discount_percentage;
      if (start_date) promotion.start_date = start_date;
      if (end_date) promotion.end_date = end_date;

      await promotionRepository.save(promotion);

      res.status(200).json({ message: 'Promotion updated successfully', promotion });
    } catch (error) {
      next(error);
    }
  }

  static async deletePromotion(req, res, next) {
    const promotionRepository = getRepository(Promotion);
    const promotionId = req.params.id;

    try {
      const promotion = await promotionRepository.findOne(promotionId);
      if (!promotion) {
        return res.status(404).json({ message: 'Promotion not found' });
      }

      await promotionRepository.remove(promotion);

      res.status(200).json({ message: 'Promotion deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PromotionController;
