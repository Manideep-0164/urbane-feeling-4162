const cartRouter = require("express").Router();
require("dotenv").config();
const { CartModel } = require("../models/cart.model");
const { UserModel } = require("../models/user.model");

cartRouter.post("/add-to-cart", async (req, res) => {
  try {
    const { user, name, brand, image, price, category, quantity } = req.body;

    const isProductExistsInCart = await CartModel.findOne({
      user: user,
      name: name,
    });

    if (isProductExistsInCart) return res.json({ message: "Already added!" });

    const cartItem = new CartModel({
      name,
      brand,
      image,
      price,
      category,
      quantity,
      user,
    });

    await cartItem.save();

    res.json({ message: "Product added to cart." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

cartRouter.get("/cart-items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const allProductsOfCart = await CartModel.find({ user: id });

    if (allProductsOfCart.length === 0)
      return res.json({ message: "Your Cart is empty." });

    res.json(allProductsOfCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

cartRouter.delete("/cart-items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const noOfDeletedItems = await CartModel.deleteMany({ user: id });

    res.json(noOfDeletedItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

cartRouter.delete("/remove-item/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const isProductExists = await CartModel.findOne({ _id: id });

    if (!isProductExists)
      return res.json({ message: "Product does not exist." });

    await CartModel.findByIdAndDelete(id);

    res.json({ message: "Item removed." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

cartRouter.patch("/update-item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const isProductExists = await CartModel.findOne({ _id: id });

    if (!isProductExists)
      return res.json({ message: "Product does not exist." });

    await CartModel.findByIdAndUpdate(id, payload);

    res.json({ message: "Item updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = {
  cartRouter,
};
