const mongoose = require("mongoose");

const AGSchema = mongoose.Schema({
    name:{type:String, required:true},
    brand:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true}
},{versionKey:false});

const pumpSchema = mongoose.Schema({
    name:{type:String, required:true},
    brand:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true}
},{versionKey:false, strict:false});

const electricalSchema = mongoose.Schema({
    name:{type:String, required:true},
    brand:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true}
},{versionKey:false, strict:false});

const ITSchema = mongoose.Schema({
    name:{type:String, required:true},
    brand:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true}
},{versionKey:false, strict:false});

const AGModel = mongoose.model("AGproduct",AGSchema);
const PumpModel = mongoose.model("Pumpproduct",pumpSchema);
const ElectricalModel = mongoose.model("Electricalproduct",electricalSchema);
const ITModel = mongoose.model("ITproduct",ITSchema);


module.exports = {
    AGModel,
    PumpModel,
    ElectricalModel,
    ITModel,
}