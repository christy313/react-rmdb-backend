const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");
const app = express();
const { Client } = require("pg");

const { handleSignup } = require("./controllers/signup");
const { handleLogin } = require("./controllers/login");

// const db = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// db.connect();

const db = knex({
  client: "pg",
  connection: {
    host: "process.env.PGHOST",
    user: "process.env.PGUSER",
    password: "process.env.PGPASSWORD",
    database: "process.env.PGDATABASE",
  },
});

// const db = new Client({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });
// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// const db = knex({
//   client: "pg",
//   connectionString: process.env.DATABASE_URL,
//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
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
