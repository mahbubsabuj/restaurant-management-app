const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require("../models/product");
const auth = require("../helpers/auth");
const checkRole = require("../helpers/checkRole");

//GETS
router.get("/", auth.auth, async (req, res) => {
  const productList = await Product.find().populate("category");
  if (!productList) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).send(productList);
});

//PUTS

//POSTS
router.post("/", auth.auth, checkRole.checkRole, async (req, res) => {
  const { name, category, description, price, status } = req.body;
  let product = new Product({ name, category, description, price, status });
  product = await product.save();
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product could not be created" });
  }
  return res.status(201).send(product);
});

module.exports = router;
