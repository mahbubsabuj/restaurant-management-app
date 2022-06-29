const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Bill } = require("../models/bill");
const auth = require("../helpers/auth");
const checkRole = require("../helpers/checkRole");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

//POSTS
router.post("/generateReport", auth.auth, async (req, res) => {
  const generatedUUID = uuid.v1();
  const orderDetails = req.body;
  const productDetailsReport = JSON.parse(orderDetails.productDetails);
});
