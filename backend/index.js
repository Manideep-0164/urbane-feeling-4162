const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection }  = require("./configs/db");
const { userRouter } = require("./routes/user.router");
const { authenticate, authenticateAdmin } = require("./middlewares/authenticate.middleware");
const { adminRouter } = require("./routes/admin.router");

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send({"msg":"Working..."});
});

app.use("/users",userRouter);

// app.use(authenticate);
app.use(authenticateAdmin);
app.use("/products",adminRouter);


const PORT = process.env.port || 2020

app.listen(PORT, async(req,res)=>{
    try{
        await connection;
        console.log("\n<---- Connected to DB ---->\n");
        console.log(`Server is Running at the port: http://localhost:${PORT}`)
    }
    catch(err){
        console.log(err);
    }
})