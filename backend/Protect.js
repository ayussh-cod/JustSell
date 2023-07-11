const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./modals/users");

const Protect = async (req, res, next) => {

  if (req.headers && req.headers.authorization) {
    try {
      usertoken = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(usertoken, process.env.Secreat_Key);
      req.user = await User.findOne({ _id: decode.id }).select("-password");
      next();
    } 
    catch (error) {
      console.log(error)
     throw new Error("Not authorised , token failed");
    }
  }
  else 
   throw new Error("No authority");
 
};
module.exports = Protect;
