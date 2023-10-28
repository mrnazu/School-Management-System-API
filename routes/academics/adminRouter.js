const express = require("express");
const { registerAdminCtrl, loginAdminCtrl, allAdminCtrl } = require("../../controller/staff/adminCTRL");
const adminRouter = express.Router();

// register
adminRouter.post('/register', registerAdminCtrl);

// login
adminRouter.post('/login', loginAdminCtrl)

// all admins
adminRouter.get('/', allAdminCtrl)

// single admin
adminRouter.get('/:id', function(req, res){
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
})

// update admin
adminRouter.put('/:id', function(req, res){
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
})

// delete admin
adminRouter.delete('/:id', function(req, res){
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
})

// admin suspend
adminRouter.put('/suspend/teacher/:id', function(req, res){
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
})

// admin unsuspend
adminRouter.put('/unsuspend/teacher/:id', function(req, res){
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
})

// admin withdrawing
adminRouter.put('/withdraw/teacher/:id', function(req, res){
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
})

// admin unwithdrawing
adminRouter.put('/unwithdraw/teacher/:id', function(req, res){
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
})

// admin publish
adminRouter.put('/publish/exam/:id', function(req, res){
    try {
        res.status(201).json({
            status: "success",
            data: "admin publish exam",
        })
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
});

// admin unpublish
adminRouter.put('/unpublish/exam/:id', function(req, res){
    try {
        res.status(201).json({
            status: "success",
            data: "admin unpublish exam"
        })
    } catch (err) {
        res.json({
            status: "failed",
            err: err.message,
        });
    }
});



module.exports = adminRouter;