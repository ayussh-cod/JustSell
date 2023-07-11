const express = require("express");
const product = require("../modals/product");
const router = express.Router();
const User = require("../modals/users");
const jwt = require("jsonwebtoken");
router.route("/Signup").post(async (req, res) => {
  try {
    const { name, username, password,phoneNumber,pic } = req.body;
    const d = await User.findOne({ username: username });
    if (d) throw new Error("username already exists");
    const user = await User.create({
      name: name,
      password: password,
      username: username,
      phoneNumber:phoneNumber,
      pic:pic
    });
    res.status(200).json({
      id: user._id,
      name: user.name,
      username: user.username,
      phoneNumber:phoneNumber,
      pic:pic,
      token: jwt.sign({ id: user._id }, process.env.Secreat_Key, { expiresIn: "30d" }),
    });
  } catch (error) {
    
    res.status(200).json("error");
  }
});

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    
    // console.log("HariBOl");
    if (user && (await user.matchPassword(password))) {
      
      res.status(200).json({
        id: user._id,
        name: user.name,
        username: user.username,
        phoneNumber:user.phoneNumber,
      pic:user.pic,
        token: jwt.sign({ id: user._id }, process.env.Secreat_Key, { expiresIn: "30d" }),
      });
    } else {
      throw new Error("credentials invalid");
    }
  } catch (error) {
    res.status(200).json("error");
  }
});

module.exports = router;
