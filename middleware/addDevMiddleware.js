const cors = require('cors');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');
const config = require('../config');
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

module.exports = function addDevMiddleware(app) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongoURL, (error) => {
        if (error) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw error;
     }

    console.log('Connected to MongoDB');
    app.use(cors(), bodyParser.json(), expressJwt({
        secret: jwtSecret,
        credentialsRequired: false
    }));
}