const express = require("express");

const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const orderModel = new mongoose.Schema({
 id  : {
     type : String
 },
 customer :{
     type:String,
     required:true,
 },
 order :{
     type: String,
     required: true,
 },
 deliveryDate : {
     type : String,
     required:true,
 },
 orderValue :{
     type : String,
     required: true,
 },
 payment : {
     type : String,
     default :false
 }
},
{timestamps:true});

const Order = mongoose.model("order" , orderModel)
module.exports = Order;