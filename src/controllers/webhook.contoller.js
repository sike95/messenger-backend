const dotenv = require('dotenv');
dotenv.config();

const MessageHandler = require('../handlers/messegeHandler');
const UserHandler = require('../handlers/userHandler');

exports.createWebHook = (req, res, next) => {
  const _messageHandler = new MessageHandler();
  const _userHandler = new UserHandler();
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      if (webhook_event.message) {
        _userHandler.handelUserInfo(sender_psid);
        _messageHandler.handleMessage(sender_psid, webhook_event.message);
        req.app.io.emit('message', {userId: sender_psid, message: webhook_event.message});    
      }
      
    });
    res.status(200).send('EVENT_RECEIVED');

  } else {
    res.sendStatus(404);
  }

}


exports.getWebHook = (req, res, next) => {

  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  if (!VERIFY_TOKEN) {
    console.log('Error: No Enviroment Variables Set Up');
    res.sendStatus(500);
  }
  if (mode && token) { 
      console.log(token + " vs  " + VERIFY_TOKEN + mode);
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      res.sendStatus(403);      
    }
  } else {
    res.sendStatus(403);
  }
}
