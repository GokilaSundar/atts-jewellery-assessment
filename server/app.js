import "./database.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminModel } from "./model/adminModel.js";

const app = express();

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.listen(5000, () => {
  console.log("server successfully run");
});
