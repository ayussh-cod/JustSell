const express = require("express");
const product = require("../modals/product");
const mongoose = require("mongoose");
const Protect = require("../Protect");
const router = express.Router();

router.route("/").get(async (req, res) => {    
  let resu;
  if (req.query.id) resu = await product.find({ _id: req.query.id }).populate("user","-password");
  else resu = await product.find({});

  res.status(200).json(resu);
});
router.route("/").post(Protect, async (req, res) => {
  try {
    // console.log(req.user)
    const { pic } = req.body;
    let p = pic.pic;
    let q = p;
    let t;
console.log(q);
    if (q) {
      t = q.split("/");
    } else {
      return;
    }
    console.log(t);
    let image = `http://res.cloudinary.com/dopsbmkae/image/upload/w_200,h_200/${t[t.length - 2]}/${t[t.length - 1]}`;
    const pro = await product.create({
      name: pic.name,
      image: image,
      description: pic.desc,
      price: pic.price,
      user: req.user._id,
    });
   
    res.status(200).json(pro);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});
router.route("/:id").get(async (req, res) => {

  const {id}=req.params
   
const userId = id;
  const data = await product.find({ user:  userId});
  res.status(200).json(data);
});
router.route("/remove/:id").get(Protect,async(req,res)=>{
  const {id}=req.params
  const prod=await product.findOne({_id:id}).populate("user")
  if(req.user._id.equals(prod.user._id))
    {
      await product.deleteOne({_id:id})
      res.status(200).json("done")
  }
  else
  {
    throw new Error("Not allowed")
    res.status(200).json("error");
  }
})
module.exports = router;
