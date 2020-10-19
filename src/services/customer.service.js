const Customer = require('../models/customer');
const mongoose = require('mongoose');

class CustomerService {

    async createRecord(data) {
        var date = Date.now();
        const customer = new Customer({
            _id: data.Id,
            firstName: data.firstName,
            lastName: data.lastName,
            profileImage: data.profileImage,
            location: data.location,
            created: date,
        });

       await customer.save()
        .then(result => {
            console.log(result)
        }).catch(err => console.log(err));
    }

    async getRecordById(id) {
        return Customer.findById(id)
        .exec();
    }

    async getAllRecords() {
        return Customer.find()
        .exec();
    }

    async updateCustomerConversation(customerId, objectId) {

        return Customer
        .updateOne(
            { _id: customerId},
            { "$push": { "conversation": objectId } },
        ).exec();
    }
}

module.exports = CustomerService;