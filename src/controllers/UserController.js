const { getRepository } = require('typeorm');
const AppDataSource = require('../data-source');
const { User } = require('../entities/User');
const bcrypt = require('bcrypt');

class UserController {

  static async getProfile(req, res, next) {
    const userRepository = AppDataSource.getRepository(User);
    const userId = req.userId;

    try {
      const user = await userRepository.findOne({
        where: { id: userId },
        select: ['id', 'name', 'email', 'phone_number', 'address', 'created_at', 'updated_at'],
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    const userRepository = AppDataSource.getRepository(User);
    const userId = req.userId;
    const { name, phone_number, address } = req.body;

    try {
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (name) user.name = name;
      if (phone_number) user.phone_number = phone_number;
      if (address) user.address = address;

      await userRepository.save(user);

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    const userRepository = AppDataSource.getRepository(User);
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    try {
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      user.password_hash = await bcrypt.hash(newPassword, 10);

      await userRepository.save(user);

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
