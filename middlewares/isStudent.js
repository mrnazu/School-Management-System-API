const Student = require("../model/Academic/Student");
const Teacher = require("../model/Staff/Teacher");

const isStdudent = async (req, res, next) => {
  //find the user
  const userId = req?.userAuth?._id;
  const teacherFound = await Student.findById(userId);
  //check if student
  if (teacherFound?.role === "student") {
    next();
  } else {
    next(new Error("Access Denied, Student only"));
  }
};

module.exports = isStdudent;
