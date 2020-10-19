const Message = require('../models/Message');
const mongoose = require('mongoose');

class MessageService {

    async createRecord(data) {
        var date = Date.now();
        const message = new Message({
            _id: new mongoose.Types.ObjectId(),
            agent: data.agent,
            message: data.message,
            created: date,
        });

        return message
            .save(message);
    }

    async getRecordById(id) {
        return Message.findById(id)
            .exec();
    }

    async getByRecordIds(conversationIds) {
        return Message.find({
            '_id': {
                $in: conversationIds
            }
        }).exec();
    }
}

module.exports = MessageService;