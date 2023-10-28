const express = require("express");
const {
  checkExamResults,
  getAllExamResults,
  adminToggleExamResult,
} = require("../../controller/academics/examResults");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const isStdudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");

const examResultRouter = express.Router();

examResultRouter.get("/", isStudentLogin, isStdudent, getAllExamResults);
examResultRouter.get(
  "/:id/checking",
  isStudentLogin,
  isStdudent,
  checkExamResults
);

examResultRouter.put(
  "/:id/admin-toggle-publish",
  isLogin,
  isAdmin,
  adminToggleExamResult
);
module.exports = examResultRouter;
