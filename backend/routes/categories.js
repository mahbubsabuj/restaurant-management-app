const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const auth = require("../helpers/auth");
const checkRole = require("../helpers/checkRole");

//GETS
// router.get("/", auth.auth, checkRole.checkRole, async (req, res) => {});

//PUTS

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
