require("dotenv").config();

const config = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    dialect: "pg",
  },
  test: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    dialect: "pg",
  },
  production: {
    username: "process.env.PGUSER",
    password: "process.env.PGPASSWORD",
    database: "process.env.PGDATABASE",
    host: "process.env.PGHOST",
    dialect: "pg",
    use_env_variable: "DATABASE_URL",
  },
};

module.exports = config;
