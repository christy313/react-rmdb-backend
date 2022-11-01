const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
// const knex = require("knex");
const app = express();
const { Client } = require("pg");

const { handleSignup } = require("./controllers/signup");
const { handleLogin } = require("./controllers/login");

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect();

// const db = knex({
//   client: "pg",
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.get("/", (req, res) => res.status(200).json("success"));

app.post("/login", (req, res) => handleLogin(req, res, db, bcrypt));

app.post("/signup", (req, res) => handleSignup(req, res, db, bcrypt));

app.listen(process.env.PORT || 8080, () => {
  console.log(`server is running on PORT: ${process.env.PORT}`);
});
