import express from "express";
import mongoose from "mongoose";
import Category from "../models/Category.js";

const router = express.Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// lijst alle categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// een category opvragen
router.get("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Not found" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE: nieuwe category
router.post("/", async (req, res) => {
  try {
    if (!req.body.name || req.body.name.trim() === "") {
      return res.status(400).json({ message: "name is required" });
    }

    const newCategory = await Category.create({ name: req.body.name.trim() });
    res.status(201).json(newCategory);
  } catch (err) {
    // als je later unique toevoegt, kan je dit gebruiken:
    // if (err.code === 11000) return res.status(409).json({ message: "Category already exists" });
    res.status(500).json({ message: err.message });
  }
});

// UPDATE: bestaande category
router.put("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    if (!req.body.name || req.body.name.trim() === "") {
      return res.status(400).json({ message: "name is required" });
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name.trim() },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: category verwijderen
router.delete("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
