const registerAdminCtrl = function(req, res){
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
}

const loginAdminCtrl = function(req, res){
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
}

const allAdminCtrl = function(req, res){
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
}

module.exports = {
    registerAdminCtrl,
    loginAdminCtrl,
    allAdminCtrl
}