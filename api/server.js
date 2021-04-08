const express = require('express');
const userRouter = require("./users/users-router")
const { logger } = require("./middleware/middleware")
const helmet = require("helmet")
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use(helmet())
// global middlewares and the user's router need to be connected here

server.use("/api/users", userRouter)

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
