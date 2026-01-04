import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// lijst alle categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// een category opvragen
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Not found" });
  res.json(category);
});

//CREATE: nieuwe category
router.post("/", async (req, res) => {
  if (!req.body.name || req.body.name.trim() === "") {
    return res.status(400).json({ message: "name is required" });
  }

  const newCategory = await Category.create({ name: req.body.name });
  res.status(201).json(newCategory);
});

//UPDATE: bestaande category
router.put("/:id", async (req, res) => {
  if (!req.body.name || req.body.name.trim() === "") {
    return res.status(400).json({ message: "name is required" });
  }

  const updated = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

// DELETE: category verwijderen
router.delete("/:id", async (req, res) => {
  const deleted = await Category.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.status(204).send();
});

export default router;
