import express from "express";
import { adminModel } from "../model/adminModel.js";

const router = express.Router();

router.get("/me", async (req, res) => {
  try {
    const adminId = req.adminId;

    if (!adminId) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    const user = await adminModel.findById(adminId);

    if (!user) {
      return res.status(401).send({ message: "Unknown user!" });
    }

    const data = user.toJSON();

    delete data.adminPassword;

    res.status(200).send(data);
  } catch (error) {
    console.error("Failed to get current user!", error);
    1;
    res.status(500).send({ message: "Failed to register", error });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("authCookie");

  res.send({
    message: "Successfully logged out!",
  });
});

export default router;
