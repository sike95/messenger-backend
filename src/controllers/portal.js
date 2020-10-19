const CustomerService = require('../services/customer.service');
const MessageService = require('../services/message.service');


exports.getCustomers = (req, res, next) => {
    let customerService = new CustomerService();

    customerService.getAllRecords()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(404);
        })
}

exports.getCustomerMessages = async (req, res, next) => {
    let customerService = new CustomerService();
    let messageService = new MessageService();
    const id = req.params.id;

    let customer = await customerService.getRecordById(id);
    let conversation = customer.conversation;

    if (!customer) {
        res.status(500).send('NO_USER_RECORD');
    }

    messageService.getByRecordIds(conversation)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(404);
        })
}
