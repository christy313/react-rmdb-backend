const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");
const app = express();
const pg = require("pg");

// const environment = process.env.NODE_ENV || "production"; // if something else isn't setting ENV, use development
// const configuration = require("./knexfile")[environment]; // require environment's settings from knexfile
// const db = require("knex")(configuration);

const { handleSignup } = require("./controllers/signup");
const { handleLogin } = require("./controllers/login");

// const pool = new pg.Pool();

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  // connection: {
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: true,
  // },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.status(200).json("success"));

app.post("/login", (req, res) => handleLogin(req, res, db, bcrypt));

app.post("/signup", (req, res) => handleSignup(req, res, db, bcrypt));

app.listen(process.env.PORT || 7858, () => {
  console.log(`server is running on PORT: ${process.env.PORT}`);
});
