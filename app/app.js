const express = require("express");
const { checkExamResults } = require("../controller/academics/examResults");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const academicTermRouter = require("../routes/academics/academicTerm");
const academicYearRouter = require("../routes/academics/academicYear");
const classLevelRouter = require("../routes/academics/classLevel");
const examRouter = require("../routes/academics/examRoutes");
const examResultRouter = require("../routes/academics/examRsultsRoute");
const programRouter = require("../routes/academics/program");
const questionsRouter = require("../routes/academics/questionRoutes");
const subjectRouter = require("../routes/academics/subjects");
const yearGroupRouter = require("../routes/academics/yearGroups");
const adminRouter = require("../routes/staff/adminRouter");
const studentRouter = require("../routes/staff/student");
const teachersRouter = require("../routes/staff/teachers");

const app = express();

//Middlewares
app.use(express.json()); //pass incoming json data

//Routes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/teachers", teachersRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/exam-results", examResultRouter);
//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
