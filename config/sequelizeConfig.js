require('dotenv').config({ path: '../.env'});

module.exports = {
  development: {
    username: process.env.DB_USER_LOCALDEV,
    password: process.env.DB_PASSWORD_LOCALDEV,
    database: process.env.DB_NAME_LOCALDEV,
    host: process.env.DB_HOST_LOCALDEV,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  },
};
