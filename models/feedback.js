const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
 UserId: {type: String},
 
Feedback: {type: String},

}, 
 { timestamps: true});

module.exports = mongoose.model('feedback', FeedbackSchema);
