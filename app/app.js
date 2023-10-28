const express = require('express');
const morgan = require('morgan');
const app = express();

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Routes

// admin register
app.post('/api/v1/admins/register', function(req, res){
    try {
        res.status(201).json({
            status: "success",
            data: "Admin has been registered"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// admin login
app.post('/api/v1/admins/login', function(req, res){
    try {
        res.status(201).json({
            status: "success",
            data: "Admin has been logged in"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// get all admins
app.get('/api/v1/admins/', function(req, res){
    try {
        res.status(200).json({
            status: "success",
            data: "All admins"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// get single admin
app.get('/api/v1/admins/:id', function(req, res){
    try {
        res.status(200).json({
            status: "success",
            data: "single admin"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// update admin
app.put('/api/v1/admins/:id', function(req, res){
    try {
        res.status(200).json({
            status: "success",
            data: "update admin"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// delete admin
app.delete('/api/v1/admins/:id', function(req, res){
    try {
        res.status(200).json({
            status: "success",
            data: "delete admins"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// admin suspending teacher
app.put('/api/v1/admins/suspend/teacher/:id', function(req, res){
    try {
        res.status(201).json({
            status: "success",
            data: "admin suspend teacher"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// admin Unsuspending teacher
app.put('/api/v1/admins/unsuspend/teacher/:id', function(req, res){
    try {
        res.status(201).json({
            status: "success",
            data: "admin unsuspend teacher"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// admin withdrawing teacher
app.put('/api/v1/admins/withdraw/teacher/:id', function(req, res){
    try {
        res.status(201).json({
            status: "success",
            data: "admin withdraw teacher"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// admin Unwithdrawing teacher
app.put('/api/v1/admins/unwithdraw/teacher/:id', function(req, res){
    try {
        res.status(201).json({
            status: "success",
            data: "admin unwithdraw teacher"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// admin publishing exam result teacher
app.put('/api/v1/admins/publish/exam/:id', function(req, res){
    try {
        res.status(201).json({
            status: "success",
            data: "admin publish exam"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});

// admin Unpublishing exam result teacher
app.put('/api/v1/admins/unpublish/exam/:id', function(req, res){
    try {
        res.status(201).json({
            status: "success",
            data: "admin unpublish exam"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        })
    }
});


module.exports = app;