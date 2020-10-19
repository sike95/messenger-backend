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
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors({ credentials: false }));
app.options('*', cors());
const webhook = require('./src/routes/webhook');
const portal = require('./src/routes/portal');

app.use('/', webhook);
app.use('/', portal);

database.connectToDatabase();



const port = process.env.PORT || 1337;
app.listen(port, () =>
  console.log(`webhook is listening on port: ${port}`)
);

io.sockets.on('connection', function (socket) {

  socket.on('message', function (data) {
    const _messageHandler = new MessageHandler();
    _messageHandler.handlePostback(data._id, data.message);
  });
});