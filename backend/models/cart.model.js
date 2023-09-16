const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    user: { type: String, required: true },
  },
  { versionKey: false }
);

const CartModel = mongoose.model("cart", cartSchema);

module.exports = {
  CartModel,
};
