import mongoose from "mongoose";

const jewellerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  manufacturingDate: {
    type: Date,
    required: true,
  },
  jewelleryImage: {
    name: {
      type: String,
      required: true,
    },
    dataUrl: {
      type: String,
      required: true,
    },
  },
});

export const jewelleryModel = mongoose.model(
  "Jewellery",
  jewellerySchema,
  "jewellery"
);
