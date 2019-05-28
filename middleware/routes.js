const jwt = require('jsonwebtoken');

module.exports = function routes(app) {
    app.post('/login', (req, res) => {
        const {email, password} = req.body;
        
        //check database
        const user = db.students.list().find((user) =>  user.email === email);
        if (!(user && user.password === password)) {
           res.sendStatus(401);
           return;
        }
        
        //generate a token based on private key, token doesn't have an expiry
        const token = jwt.sign({sub: user.id}, jwtSecret);
        res.send({token});
    });
}