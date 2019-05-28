const express = require('express');
const apolloServer = require('./middleware/apolloServer');
const addDevMiddleware = require('./middleware/addDevMiddleware');
const routes = require('./middleware/routes');
const port = process.env.PORT || 9000;
const app = express();

addDevMiddleware(app);
apolloServer(app);
routes(app);

app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);