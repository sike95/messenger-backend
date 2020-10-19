const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    agent: Boolean,
    message: String,
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Message', messageSchema);