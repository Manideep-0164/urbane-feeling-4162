const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.router");
const { productRouter } = require("./routes/product.router");
const { cartRouter } = require("./routes/cart.router");
const {
  authenticate,
  authenticateAdmin,
} = require("./middlewares/authenticate.middleware");
const { adminRouter } = require("./routes/admin.router");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ msg: "Working..." });
});

app.use("/users", userRouter);
app.use("/products", adminRouter);
app.use("/product", productRouter);

app.use(authenticate);

app.use("/cart", cartRouter);

const PORT = process.env.port || 2020;

(async function () {
  try {
    await connection;
    console.log("connected to DB");
    app.listen(PORT, (req, res) => {
      console.log(`Server is Running at the port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
})();
