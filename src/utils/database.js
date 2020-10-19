const mongoose = require('mongoose');
const config = require('../config/config');

exports.connectToDatabase = () => {

    mongoose
        .connect(
            config.connectionString,
            {
                usedNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }).then((connection) => console.log('DB connection successful'));
}
