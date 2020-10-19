const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({
    _id: String,
    firstName: String,
    lastName: String,
    conversation: Array,
    profileImage: String,
    location: String,
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Customer', customerSchema);