const http = require('http');
const app = require('./app/app')
require('dotenv').config();
require('./config/connectDB')

const port = process.env.PORT || 2023

// =======Server====
const server = http.createServer();
server.listen(port, console.log(`Server is running on port ${port}`));