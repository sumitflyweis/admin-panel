const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
 UserId: {type: String},
 
balance: {default:0},


}, 
 { timestamps: true});

module.exports = mongoose.model('wallet', walletSchema);


