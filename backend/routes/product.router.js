const productRouter = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AGModel } = require("../models/product.model");
const { query } = require("express");

productRouter.get("/sort", async (req, res) => {
  try {
    const { sort, cat } = req.query;

    const sortOptions = {
      "Price - Low to High": { price: "asc" },
      "Price - High to Low": { price: "desc" },
      "Name - Low to High": { name: "asc" },
      "Name - High to Low": { name: "desc" },
    };

    const query = sortOptions[sort] || {};
    const filterOptions = cat ? { category: cat } : {};

    const products = await AGModel.find(filterOptions).sort(query);

    if (products.length === 0)
      return res.status(404).json({ message: "No products available." });

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = {
  productRouter,
};
