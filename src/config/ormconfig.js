require('dotenv').config();
const { DataSource } = require('typeorm');
const { User } = require('./entities/User');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'limousine_reservation',
  synchronize: true, // For development; disable in production
  logging: false,
  entities: [User], // Register your entities here
  migrations: [],
  subscribers: [],
};
