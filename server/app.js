import "./database.js";

import cookie from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";

import adminRouter from "./routes/admin.js";
import jewelleryRouter from "./routes/jewelleries.js";
import meRouter from "./routes/me.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use("/api", meRouter);

app.use("/api", jewelleryRouter);

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.listen(5000, () => {
  console.log("server successfully run");
});
