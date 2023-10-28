const http = require('http');
const app = require('./app/app')
require('./config/connectDB.JS')

const port = process.env.port || 2023

// =======Server====
const server = http.createServer();
server.listen(port, console.log(`Server is running on port ${port}`));