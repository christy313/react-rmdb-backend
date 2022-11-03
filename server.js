// const express = require("express");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const knex = require("knex");

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import knex from "knex";

// const { handleSignup } = require("./controllers/signup");
// const { handleLogin } = require("./controllers/login");

import { handleSignup } from "./controllers/signup";
import { handleLogin } from "./controllers/login";

const app = express();
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.status(200).json("success"));

app.post("/login", (req, res) => handleLogin(req, res, db, bcrypt));

app.post("/signup", (req, res) => handleSignup(req, res, db, bcrypt));

app.listen(process.env.PORT || 8080, () => {
  console.log(`server is running on PORT: ${process.env.PORT}`);
});
