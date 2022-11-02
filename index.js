// require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");
const app = express();
const { Client } = require("pg");

const { handleSignup } = require("./controllers/signup");
const { handleLogin } = require("./controllers/login");

// heroku

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    // ssl: true,
  },
});

// railway

// const db = knex({
// connection: {
//   host: "process.env.PGHOST",
//   user: "process.env.PGUSER",
//   password: "process.env.PGPASSWORD",
//   database: "process.env.PGDATABASE",
// },
// });

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.status(200).json("success"));

app.post("/login", (req, res) => handleLogin(req, res, db, bcrypt));

app.post("/signup", (req, res) => handleSignup(req, res, db, bcrypt));

app.listen(process.env.PORT || 8080, () => {
  console.log(`server is running on PORT: ${process.env.PORT}`);
});
