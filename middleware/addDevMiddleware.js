const cors = require('cors');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

module.exports = function addDevMiddleware(app) {
    app.use(cors(), bodyParser.json(), expressJwt({
        secret: jwtSecret,
        credentialsRequired: false
    }));
}