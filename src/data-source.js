const { DataSource } = require('typeorm');
const { User } = require('./entities/User');
const { Reservation } = require("./entities/Reservation")
const { Review } = require('./entities/Review');
const { Payment } = require('./entities/Payment');
const { Promotion } = require('./entities/Promotion');
const { Vehicle } = require('./entities/Vehicle');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'your_db_username',
  password: process.env.DB_PASSWORD || 'your_db_password',
  database: process.env.DB_NAME || 'your_db_name',
  synchronize: true,
  logging: false,
  entities: [User, Reservation, Review, Payment, Promotion, Vehicle],
  migrations: [],
  subscribers: [],
});

module.exports = AppDataSource;
