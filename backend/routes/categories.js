const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Category } = require("../models/category");
const auth = require("../helpers/auth");
const checkRole = require("../helpers/checkRole");

//GETS
router.get("/", auth.auth, checkRole.checkRole, async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).send(categoryList);
});

//PUTS
router.put("/:id", auth.auth, checkRole.checkRole, async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  if (!category) {
    return res
      .status(500)
      .json({ success: false, message: "category cannot be updated" });
  }
  return res.status(200).send(category);
});

//POSTS
router.post("/", auth.auth, checkRole.checkRole, async (req, res) => {
  const { name } = req.body;
  let category = new Category({ name });
  category = await category.save();
  if (!category) {
    return res
      .status(500)
      .json({ success: false, message: "category could not be created" });
  }
  return res.status(201).send(category);
});

module.exports = router;
