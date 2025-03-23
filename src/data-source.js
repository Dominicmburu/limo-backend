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
  host: process.env.DB_HOST || 'dpg-cvg5n97noe9s73bmnl10-a',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'dominic',
  password: process.env.DB_PASSWORD || 'BwC9xCziUH666GTss5EePTzCGZUJYYJs',
  database: process.env.DB_NAME || 'limodb',
  synchronize: true,
  logging: false,
  entities: [User, Reservation, Review, Payment, Promotion, Vehicle],
  migrations: [],
  subscribers: [],
});

module.exports = AppDataSource;
