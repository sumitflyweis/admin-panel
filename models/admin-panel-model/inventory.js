const express = require("express");

const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
 id:{
     type :String
 },
 productDetail : {
     type : String,
     required : true
 },
 quantity :{
     type : String,
     required : true
 }
},
{timestamps:true});

const Inventory = mongoose.model("inventory" , inventorySchema)
module.exports = Inventory;