const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const typeDefs = fs.readFileSync('graphqls/schema.graphql',{encoding:'utf-8'});
const resolvers = require('../graphqls/resolvers');

module.exports = function apolloServer(app) {
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: ({req}) => 
            {
                return req.user && db.students.get(req.user.sub);
            }
    });
    server.applyMiddleware({ app });
};