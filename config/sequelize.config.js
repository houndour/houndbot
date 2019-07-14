const dotenv = require('dotenv').config(); // eslint-disable-line no-unused-vars

module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DEBUG,
    define: {
      underscored: true
    },
    storage: __dirname + '/../database.sqlite',
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DEBUG,
    define: {
      underscored: true
    },
    storage: __dirname + '/../database.sqlite',
  },
  testing: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DEBUG,
    define: {
      underscored: true
    },
    storage: __dirname + '/../database.sqlite',
  }
};
