const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const salt = process.env.SALT;

//GETS

router.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) {
    return res
      .status(500)
      .json({ success: false, message: "cannot get users" });
  }
  return res.status(200).send(userList);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-passwordHash");
  if (!user) {
    return res.status(500).json({ success: false, message: "cannot get user" });
  }
  return res.status(200).send(user);
});

//PUTS

//POSTS
router.post("/signup", async (req, res) => {
  const { name, contactNumber, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, +salt);
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "email already exist" });
  }
  let user = new User({
    name,
    contactNumber,
    email,
    passwordHash,
  });
  user = await user.save();
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "user cannot be created" });
  }
  return res.status(201).send(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "user does not exist" });
  }
  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    if (user.status) {
      return res
        .status(200)
        .json({ success: true, message: "user logged in successfully" });
    }
    return res
      .status(500)
      .json({ success: false, message: "wait for admin approval" });
  }
  return res
    .status(500)
    .json({ success: false, message: "invalid email or password" });
});

module.exports = router;
// name: { type: String, required: true },
// contactNumber: { type: String, required: true },
// email: { type: String, required: true },
// passwordHash: { type: String, required: true },
// status: { type: String, required: true },
// role: { type: String, required: true },
