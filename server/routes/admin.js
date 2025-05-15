import express from "express";
import { adminModel } from "../model/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;

    if (!adminName) {
      return res.status(400).send({ message: "Name is required!" });
    }
    if (!adminEmail) {
      return res.status(400).send({ message: "Email is required!" });
    }
    if (!adminPassword) {
      return res.status(400).send({ message: "Password is required!" });
    }

    const oldUser = await adminModel.findOne({ adminEmail });

    if (oldUser) {
      return res.status(400).send({ message: "Already have an account!" });
    }

    await adminModel.create({
      adminName,
      adminEmail,
      adminPassword: bcrypt.hashSync(adminPassword, 15),
    });

    res.status(200).send({ message: "Successfully registered" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Failed to register", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { adminEmail, adminPassword: adminPassword_ } = req.body;

    if (!adminEmail) {
      return res.status(400).send({ message: "Email is required!" });
    }
    if (!adminPassword_) {
      return res.status(400).send({ message: "Password is required!" });
    }

    const oldUser = await adminModel.findOne({ adminEmail });

    if (!oldUser) {
      return res.status(400).send({ message: "Admin not found!" });
    }
    const checkPassword = bcrypt.compareSync(
      adminPassword_,
      oldUser.adminPassword
    );

    if (!checkPassword) {
      return res.status(400).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign(
      {
        adminId: oldUser._id.toString(),
      },
      process.env.JWT_SECRET
    );

    res.cookie("authCookie", token, {
      maxAge: 24 * 60 * 60 * 1000, // 24  Hours
      httpOnly: true,
    });

    const user = oldUser.toJSON();

    delete user.adminPassword;

    res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Failed to login", error });
  }
});

export default router;
