const MessengerService = require('../services/messenger.service');
const MessageService = require('../services/message.service');
const CustomerService = require('../services/customer.service');

class MessengeHandler {

  constructor() { }
  handleMessage(sender_psid, received_message) {
    let response;
    let messengerService = new MessengerService();
    let customerService = new CustomerService();
    let messageService = new MessageService();

    if (received_message.text) {
      const message = {
        agent: false,
        message: received_message.text,
      }

      messageService.createRecord(message)
        .then((doc) => {
          return doc._id;
        })
        .then((messageId) => {
          customerService
            .updateCustomerConversation(sender_psid, messageId);
        })
        .catch((err) => {
          console.log(err);
        });

    } else if (received_message.attachments) {
      // Get the URL of the message attachment
      let attachment_url = received_message.attachments[0].payload.url;
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
              "image_url": attachment_url,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no",
                }
              ],
            }]
          }
        }
      }
    }

    // // Send the response message
    // messengerService.callSendAPI(sender_psid, response);
  }

  handlePostback(sender_psid, received_postback) {

    let customerService = new CustomerService();
    let messageService = new MessageService();

    if (received_postback) {
      response = {
        "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
      }
      const messageBody = {
        agent: true,
        message: received_postback,
      }

      messageService.createRecord(messageBody)
        .then((doc) => {
          return doc._id;
        })
        .then((messageId) => {
          customerService
            .updateCustomerConversation(sender_psid, messageId);
        })
        .catch((err) => {
          console.log(err);
        });
      messengerService.callSendAPI(sender_psid, response);
    }
  }
}

module.exports = MessengeHandler;