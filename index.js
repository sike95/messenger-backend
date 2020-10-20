'use strict';
const dotenv = require('dotenv');
dotenv.config();
const MessageHandler = require('./src/handlers/messegeHandler');

// Imports dependencies and set up http server
const
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  database = require('./src/utils/database'),
  app = express().use(bodyParser.json());

var server = require('http').createServer(app);
var io = require('socket.io').listen(server)

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Add this
  if (req.method === 'OPTIONS') {

    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Max-Age', 120);
    return res.status(200).json({});
  }

  next();

});

app.use(cors({ credentials: false }));
app.options('*', cors());
const webhook = require('./src/routes/webhook');
const portal = require('./src/routes/portal');
app.io = io;

app.use('/', webhook);
app.use('/', portal);

database.connectToDatabase();



const port = process.env.PORT || 1337;
server.listen(port, () =>
  console.log(`webhook is listening on port: ${port}`)
);

io.sockets.on('connection', function (socket) {
  const _messageHandler = new MessageHandler();
  console.log('Someone connected');
  socket.emit('test event', 'test');
  socket.on('message', data => {
    console.log(data);
    if (data) {
      _messageHandler.handlePostback(data.customer._id, data.message);
    }
  });
});