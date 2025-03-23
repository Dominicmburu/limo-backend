const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppDataSource = require('../data-source');
const { User } = require('../entities/User');

class AuthController {
  static async register(req, res, next) {
    const userRepository = AppDataSource.getRepository(User);
    const { name, email, password, phone_number, address } = req.body;

    try {
      const existingUser = await userRepository.findOneBy({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const saltRounds = 10;
      const password_hash = await bcrypt.hash(password, saltRounds);

      const user = userRepository.create({
        name,
        email,
        password_hash,
        phone_number,
        address,
      });

      await userRepository.save(user);

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );

      const cookieOptions = {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
        maxAge: 60 * 60 * 1000, 
      };

      res.cookie('token', token, cookieOptions);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration Error:', error);
      next(error);
    }
  }

  static async login(req, res, next) {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    try {
      const user = await userRepository.findOneBy({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
      };

      res.cookie('token', token, cookieOptions);

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          address: user.address,
        },
        token,
      });
    } catch (error) {
      console.error('Login Error:', error);
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout Error:', error);
      next(error);
    }
  }

}

module.exports = AuthController;
