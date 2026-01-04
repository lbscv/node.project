import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const router = express.Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get("/", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit ?? "20", 10), 100);
    const offset = parseInt(req.query.offset ?? "0", 10);

    const products = await Product.find()
      .populate("categoryId", "name")
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments();

    res.json({ total, limit, offset, data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q ?? "").trim();
    if (!q) return res.status(400).json({ message: "q is required" });

    const results = await Product.find({
      name: { $regex: q, $options: "i" },
    }).limit(50);

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const product = await Product.findById(req.params.id).populate(
      "categoryId",
      "name"
    );
    if (!product) return res.status(404).json({ message: "Not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

    if (!name || String(name).trim() === "") {
      return res.status(400).json({ message: "name is required" });
    }
    if (price === undefined || price === null) {
      return res.status(400).json({ message: "price is required" });
    }

    // numeriek veld mag geen string zijn
    if (typeof price !== "number") {
      return res.status(400).json({ message: "price must be a number" });
    }

    if (!categoryId || !isValidId(categoryId)) {
      return res.status(400).json({ message: "valid categoryId is required" });
    }

    const created = await Product.create({
      name: String(name).trim(),
      price,
      categoryId,
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const { name, price, categoryId } = req.body;

    if (name !== undefined && String(name).trim() === "") {
      return res.status(400).json({ message: "name cannot be empty" });
    }
    if (price !== undefined && typeof price !== "number") {
      return res.status(400).json({ message: "price must be a number" });
    }
    if (categoryId !== undefined && !isValidId(categoryId)) {
      return res.status(400).json({ message: "categoryId must be a valid id" });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...(name !== undefined ? { name: String(name).trim() } : {}),
        ...(price !== undefined ? { price } : {}),
        ...(categoryId !== undefined ? { categoryId } : {}),
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
