import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
});

export const adminModel = mongoose.model("Admin", adminSchema, "admin");
