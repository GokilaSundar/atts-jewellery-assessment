import "./database.js";
import express from "express";
import cookie from "cookie-parser";
import jwt from "jsonwebtoken";

import adminRouter from "./routes/admin.js";

const app = express();

app.use(express.json());
app.use(cookie());

app.use("/api", adminRouter);

app.use("/api", (req, res, next) => {
  const authCookie = req.cookies["authCookie"];

  if (!authCookie) {
    return res.status(401).send({ message: "There is no cookie" });
  }

  jwt.verify(authCookie, process.env.JWT_SECRET, (error, { adminId }) => {
    if (error) {
      return res.status(403).send({ message: "Invalid token" });
    }

    req.adminId = adminId;

    next();
  });
});

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.listen(5000, () => {
  console.log("server successfully run");
});
