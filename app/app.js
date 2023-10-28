const express = require("express");
const cors = require('cors');
const app = express();

const adminRouter = require('../routes/academics/adminRouter');

//Middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));


//Admin Routes
app.use('/api/v1/admins/', adminRouter);


module.exports = app;