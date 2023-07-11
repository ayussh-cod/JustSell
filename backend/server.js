const mongoose = require("mongoose");
const express = require("express");
const connectDb = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const productRoutes = require("./Routes/productRoutes.js");
const authenticateRoutes = require("./Routes/authenticateRoutes.js");
app.use(express.json());
app.use(cors());
dotenv.config();
connectDb();

app.use("/product", productRoutes);
app.use("/authenticate",authenticateRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Hare Krishna !!!!listing on port " + PORT);
});
