import express from "express";
import { jewelleryModel } from "../model/jewelleryModel.js";
import multer from "multer";
import RegexEscape from "regex-escape";

const router = express.Router();

const fileUpload = multer();

router.post(
  "/jewellery",
  fileUpload.single("jewelleryImage"),
  async (req, res) => {
    try {
      const { name, price, description, stock, manufacturingDate, category } =
        req.body;

      const jewelleryImageRaw = req.file;

      if (!name) {
        return res.status(400).send({ message: "Name is required!" });
      }
      if (!price) {
        return res.status(400).send({ message: "price is required!" });
      }
      if (!description) {
        return res.status(400).send({ message: "description is required!" });
      }
      if (!stock) {
        return res.status(400).send({ message: "stock is required!" });
      }
      if (!category) {
        return res.status(400).send({ message: "category is required!" });
      }
      if (!manufacturingDate) {
        return res.status(400).send({ message: "date is required!" });
      }
      if (!jewelleryImageRaw) {
        return res.status(400).send({ message: "image is required!" });
      }

      const jewellery = new jewelleryModel({
        name,
        price,
        description,
        stock,
        manufacturingDate,
        category,
        jewelleryImage: {
          name: jewelleryImageRaw.originalname,
          dataUrl: `data:${
            jewelleryImageRaw.mimetype
          };base64,${jewelleryImageRaw.buffer.toString("base64")}`,
        },
      });

      const createJewellery = await jewellery.save();
      res.status(201).json(createJewellery);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to add the jewellery data" });
    }
  }
);

router.get("/jewellery", async (req, res) => {
  try {
    const {
      sortBy = "name",
      sortOrder = "1",
      search = "",
      pageNumber = "1",
      pageSize = "25",
    } = req.query || {};

    const sanitizedSearch = RegexEscape(search);

    const filter = sanitizedSearch
      ? {
          $or: [
            { name: new RegExp(sanitizedSearch, "i") },
            { description: new RegExp(sanitizedSearch, "i") },
            { category: new RegExp(sanitizedSearch, "i") },
          ],
        }
      : {};

    const limit = Number(pageSize);
    const skip = Math.max(0, (Number(pageNumber) - 1) * limit);

    const count = await jewelleryModel.countDocuments(filter);

    const items = await jewelleryModel.find(
      filter,
      {},
      {
        sort: {
          [sortBy]: Number(sortOrder),
        },
        skip,
        limit,
      }
    );

    res.status(200).json({ count, items });
  } catch (error) {
    console.error(error, "Failed to load the jewellery data");
    res.status(500).send({ message: "Failed to load the jewellery data" });
  }
});

router.put(
  "/jewellery/:id",
  fileUpload.single("jewelleryImage"),
  async (req, res) => {
    const jewellery = await jewelleryModel.findById(req.params.id);
    const jewelleryImageRaw = req.file;

    try {
      if (jewellery) {
        const updatedData = req.body;

        if (updatedData.name) jewellery.name = updatedData.name;
        if (updatedData.price) jewellery.price = updatedData.price;
        if (updatedData.description)
          jewellery.description = updatedData.description;
        if (updatedData.stock) jewellery.stock = updatedData.stock;
        if (updatedData.category) jewellery.category = updatedData.category;
        if (updatedData.manufacturingDate)
          jewellery.manufacturingDate = updatedData.manufacturingDate;

        if (jewelleryImageRaw) {
          jewellery.jewelleryImage = {
            name: jewelleryImageRaw.originalname,
            dataUrl: `data:${
              jewelleryImageRaw.mimetype
            };base64,${jewelleryImageRaw.buffer.toString("base64")}`,
          };
        }

        const updateJewellery = await jewellery.save();

        res.status(201).json(updateJewellery);
      } else {
        res.status(404).json({ message: "jewellery not found" });
      }
    } catch (error) {
      console.error(error, "Failed to update the jewellery data");
      res.status(500).send({ message: "Failed to update the jewellery data" });
    }
  }
);

router.delete("/jewellery/:id", async (req, res) => {
  const jewellery = await jewelleryModel.findByIdAndDelete(req.params.id);
  try {
    if (jewellery) {
      res.status(200).json({ message: "jewellery removed" });
    } else {
      res.status(404).json({ message: "jewellery not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Couldn't delete the jewellery" });
  }
});

export default router;
