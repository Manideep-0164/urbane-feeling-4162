const adminRouter = require("express").Router();
require("dotenv").config();
const { AGModel } = require("../models/product.model");
const {
  authenticate,
  authenticateAdmin,
} = require("../middlewares/authenticate.middleware");

// Getting agriculture data and sorting by query and paginating by 10 products

adminRouter.get("/get/ag", async (req, res) => {
  const { sort, page } = req.query;

  if (sort == "asc") var filter = 1;
  else if (sort == "dsc") var filter = -1;
  if (page) var count = 10;
  try {
    const product = await AGModel.find()
      .sort({ price: filter })
      .skip((page - 1) * count)
      .limit(count);
    if (!product[0]) {
      res.status(404).send({ msg: "No Data Exist" });
      return;
    }
    res.send(product);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// User Validation
adminRouter.use(authenticate);

// Adding Products to Agriclture gr

adminRouter.post("/add/ag", async (req, res) => {
  const data = req.body;
  try {
    if (Array.isArray(data)) {
      await AGModel.insertMany(data);
      res.send({ msg: `${data.length} Products Added` });
    } else {
      const product = new AGModel(data);
      await product.save();
      res.send({ msg: "A Product Added" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

// Deleting the product

adminRouter.delete("/delete/ag/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const exits = await AGModel.find({ _id: id });
    if (exits.length == 0) res.send({ msg: "Product Not Exist" });
    else {
      await AGModel.findByIdAndDelete({ _id: id });
      res.send({ msg: "Product Deleted" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

// Getting an item by id

adminRouter.get("/get/ag/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const exits = await AGModel.find({ _id: id });
    if (exits.length == 0) res.send({ msg: "Product Not Exist" });
    else {
      res.send(exits);
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

// Updating an item by id

adminRouter.patch("/update/ag/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const exits = await AGModel.find({ _id: id });
    if (exits.length == 0) res.send({ msg: "Product Not Exist" });
    else {
      await AGModel.findByIdAndUpdate({ _id: id }, data);
      res.send({ msg: "Product Updated" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = {
  adminRouter,
};
