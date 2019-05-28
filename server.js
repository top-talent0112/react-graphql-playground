const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const { ApolloServer, gql } = require('apollo-server-express');
const port = process.env.PORT || 9000;
const app = express();

const fs = require('fs');
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'});
const resolvers = require('./resolvers');
// const schema = makeExecutableSchema({typeDefs, resolvers})
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({req}) => 
        {
            return req.user && db.students.get(req.user.sub);
        }
});

const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
app.use(cors(), bodyParser.json(), expressJwt({
    secret: jwtSecret,
    credentialsRequired: false
}));

server.applyMiddleware({ app });
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
app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);