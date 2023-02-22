const adminRouter = require("express").Router();
require("dotenv").config();
const { AGModel, PumpModel, ElectricalModel, ITModel } = require("../models/product.model")


// Adding Products to Agriclture gr

adminRouter.post("/add/ag", async (req, res) => {
    const data = req.body;
    try {
        if(Array.isArray(data))
        {
            await AGModel.insertMany(data);
            res.send({ "msg": `${data.length} Products Added` });
        }
        else{
             const product = new AGModel(data);
            await product.save();
            res.send({ "msg": 'A Product Added' });
        }
    }
    catch(err){
        res.send({"error":err.message});
    }
});

// Getting agriculture data and sorting by query

adminRouter.get("/get/ag", async (req, res) => {
    const {sort,limit} = req.query;

    if(sort == "asc")  var filter = 1;
    else if(sort == "dsc") var filter = -1;
    if(limit) var count = 10
    try {
            const product = await AGModel.find().sort({price:filter}).limit(count*limit);
            res.send(product);
    }
    catch(err){
        res.send({"error":err.message});
    }
});

// Deleting the product 

adminRouter.delete("/delete/ag/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const exits = await AGModel.find({_id:id});
        if(exits.length==0) res.send({"msg":"Product Not Exist"});
        else{
            await AGModel.findByIdAndDelete({_id:id});
            res.send({"msg":"Product Deleted"});
        }
    }
    catch(err){
        res.send({"error":err.message});
    }
});

// Getting an item by id

adminRouter.get("/get/ag/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const exits = await AGModel.find({_id:id});
        if(exits.length==0) res.send({"msg":"Product Not Exist"});
        else{
            res.send(exits);
        }
    }
    catch(err){
        res.send({"error":err.message});
    }
});

// Updating an item by id

adminRouter.patch("/update/ag/:id", async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    try {
        const exits = await AGModel.find({_id:id});
        if(exits.length==0) res.send({"msg":"Product Not Exist"});
        else{
            await AGModel.findByIdAndUpdate({_id:id},data);
            res.send({"msg":"Product Updated"});
        }
    }
    catch(err){
        res.send({"error":err.message});
    }
});



module.exports = {
    adminRouter
}