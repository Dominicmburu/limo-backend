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
  host: process.env.DB_HOST || 'dpg-d07k2opr0fns738l454g-a.oregon-postgres.render.com',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'dominic',
  password: process.env.DB_PASSWORD || 'WCArBz4DgGwnOVVB2AGBvNwB6oOR4rHK',
  database: process.env.DB_NAME || 'limodb_cf62',
  synchronize: true,
  logging: false,
  entities: [User, Reservation, Review, Payment, Promotion, Vehicle],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = AppDataSource;

// const { DataSource } = require('typeorm');
// const { User } = require('./entities/User');
// const { Reservation } = require("./entities/Reservation")
// const { Review } = require('./entities/Review');
// const { Payment } = require('./entities/Payment');
// const { Promotion } = require('./entities/Promotion');
// const { Vehicle } = require('./entities/Vehicle');
// require('dotenv').config();

// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: true,
//   logging: false,
//   entities: [User, Reservation, Review, Payment, Promotion, Vehicle],
//   migrations: [],
//   subscribers: [],
// });

// module.exports = AppDataSource;

