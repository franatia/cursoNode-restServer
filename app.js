const Server = require('./models/server');
require('dotenv').config();

const server = new Server();

server.listen();

const mongoose = require('mongoose')
