const AysncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const ExamResult = require("../../model/Academic/ExamResults");
const Student = require("../../model/Academic/Student");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");

//@desc  Admin Register Student
//@route POST /api/students/admin/register
//@acess  Private Admin only

exports.adminRegisterStudent = AysncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //find the admin
  const adminFound = await Admin.findById(req.userAuth._id);
  if (!adminFound) {
    throw new Error("Admin not found");
  }

  //check if teacher already exists
  const student = await Student.findOne({ email });
  if (student) {
    throw new Error("Student already employed");
  }
  //Hash password
  const hashedPassword = await hashPassword(password);
  // create
  const studentRegistered = await Student.create({
    name,
    email,
    password: hashedPassword,
  });
  //push teacher into admin
  adminFound.students.push(studentRegistered?._id);
  await adminFound.save();
  //send student data
  res.status(201).json({
    status: "success",
    message: "Student registered successfully",
    data: studentRegistered,
  });
});

//@desc    login  student
//@route   POST /api/v1/students/login
//@access  Public

exports.loginStudent = AysncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find the  user
  const student = await Student.findOne({ email });
  if (!student) {
    return res.json({ message: "Invalid login crendentials" });
  }
  //verify the password
  const isMatched = await isPassMatched(password, student?.password);
  if (!isMatched) {
    return res.json({ message: "Invalid login crendentials" });
  } else {
    res.status(200).json({
      status: "success",
      message: "Student logged in successfully",
      data: generateToken(student?._id),
    });
  }
});

//@desc    Student Profile
//@route   GET /api/v1/students/profile
//@access  Private Student only

exports.getStudentProfile = AysncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth?._id)
    .select("-password -createdAt -updatedAt")
    .populate("examResults");
  if (!student) {
    throw new Error("Student not found");
  }
  //get student profile
  const studentProfile = {
    name: student?.name,
    email: student?.email,
    currentClassLevel: student?.currentClassLevel,
    program: student?.program,
    dateAtmitted: student?.dateAdmitted,
    isSuspended: student?.isSuspended,
    isWithdrawn: student?.isWithdrawn,
    studentId: student?.studentId,
    prefectName: student?.prefectName,
  };

  //get student exam results
  const examResults = student?.examResults;
  //current exam
  const currentExamResult = examResults[examResults.length - 1];
  //check if exam is published
  const isPublished = currentExamResult?.isPublished;
  //send response
  res.status(200).json({
    status: "success",
    data: {
      studentProfile,
      currentExamResult: isPublished ? currentExamResult : [],
    },
    message: "Student Profile fetched  successfully",
  });
});

//@desc    Get all Students
//@route   GET /api/v1/admin/students
//@access  Private admin only

exports.getAllStudentsByAdmin = AysncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json({
    status: "success",
    message: "Students fetched successfully",
    data: students,
  });
});

//@desc    Get Single Student
//@route   GET /api/v1/students/:studentID/admin
//@access  Private admin only

exports.getStudentByAdmin = AysncHandler(async (req, res) => {
  const studentID = req.params.studentID;
  //find the teacher
  const student = await Student.findById(studentID);
  if (!student) {
    throw new Error("Student not found");
  }
  res.status(200).json({
    status: "success",
    message: "Student fetched successfully",
    data: student,
  });
});

//@desc    Student updating profile
//@route    UPDATE /api/v1/students/update
//@access   Private Student only

exports.studentUpdateProfile = AysncHandler(async (req, res) => {
  const { email, password } = req.body;
  //if email is taken
  const emailExist = await Student.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //hash password
  //check if user is updating password

  if (password) {
    //update
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: student,
      message: "Student updated successfully",
    });
  } else {
    //update
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: student,
      message: "Student updated successfully",
    });
  }
});

//@desc     Admin updating Students eg: Assigning classes....
//@route    UPDATE /api/v1/students/:studentID/update/admin
//@access   Private Admin only

exports.adminUpdateStudent = AysncHandler(async (req, res) => {
  const {
    classLevels,
    academicYear,
    program,
    name,
    email,
    prefectName,
    isSuspended,
    isWithdrawn,
  } = req.body;

  //find the student by id
  const studentFound = await Student.findById(req.params.studentID);
  if (!studentFound) {
    throw new Error("Student not found");
  }

  //update
  const studentUpdated = await Student.findByIdAndUpdate(
    req.params.studentID,
    {
      $set: {
        name,
        email,
        academicYear,
        program,
        prefectName,
        isSuspended,
        isWithdrawn,
      },
      $addToSet: {
        classLevels,
      },
    },
    {
      new: true,
    }
  );
  //send response
  res.status(200).json({
    status: "success",
    data: studentUpdated,
    message: "Student updated successfully",
  });
});

//@desc     Student taking Exams
//@route    POST /api/v1/students/exams/:examID/write
//@access   Private Students only

exports.writeExam = AysncHandler(async (req, res) => {
  //get student
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    throw new Error("Student not found");
  }
  //Get exam
  const examFound = await Exam.findById(req.params.examID)
    .populate("questions")
    .populate("academicTerm");

  if (!examFound) {
    throw new Error("Exam not found");
  }
  //get questions
  const questions = examFound?.questions;
  //get students questions
  const studentAnswers = req.body.answers;

  //check if student answered all questions
  if (studentAnswers.length !== questions.length) {
    throw new Error("You have not answered all the questions");
  }

  // //check if student has already taken the exams
  const studentFoundInResults = await ExamResult.findOne({
    student: studentFound?._id,
  });
  if (studentFoundInResults) {
    throw new Error("You have already written this exam");
  }

  //check if student is suspende/withdrawn
  if (studentFound.isWithdrawn || studentFound.isSuspended) {
    throw new Error("You are suspended/withdrawn, you can't take this exam");
  }

  //Build report object
  let correctanswers = 0;
  let wrongAnswers = 0;
  let status = ""; //failed/passed
  let grade = 0;
  let remarks = "";
  let score = 0;
  let answeredQuestions = [];

  //check for answers
  for (let i = 0; i < questions.length; i++) {
    //find the question
    const question = questions[i];
    //check if the answer is correct
    if (question.correctAnswer === studentAnswers[i]) {
      correctanswers++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnswers++;
    }
  }
  //calculate reports
  totalQuestions = questions.length;
  grade = (correctanswers / questions.length) * 100;
  answeredQuestions = questions.map(question => {
    return {
      question: question.question,
      correctanswer: question.correctAnswer,
      isCorrect: question.isCorrect,
    };
  });

  //calculate status
  if (grade >= 50) {
    status = "Pass";
  } else {
    status = "Fail";
  }

  //Remarks
  if (grade >= 80) {
    remarks = "Excellent";
  } else if (grade >= 70) {
    remarks = "Very Good";
  } else if (grade >= 60) {
    remarks = "Good";
  } else if (grade >= 50) {
    remarks = "Fair";
  } else {
    remarks = "Poor";
  }

  //Generate Exam results
  const examResults = await ExamResult.create({
    studentID: studentFound?.studentId,
    exam: examFound?._id,
    grade,
    score,
    status,
    remarks,
    classLevel: examFound?.classLevel,
    academicTerm: examFound?.academicTerm,
    academicYear: examFound?.academicYear,
    answeredQuestions: answeredQuestions,
  });
  // //push the results into
  studentFound.examResults.push(examResults?._id);
  // //save
  await studentFound.save();

  //Promoting
  //promote student to level 200
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Pass" &&
    studentFound?.currentClassLevel === "Level 100"
  ) {
    studentFound.classLevels.push("Level 200");
    studentFound.currentClassLevel = "Level 200";
    await studentFound.save();
  }

  //promote student to level 300
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Pass" &&
    studentFound?.currentClassLevel === "Level 200"
  ) {
    studentFound.classLevels.push("Level 300");
    studentFound.currentClassLevel = "Level 300";
    await studentFound.save();
  }

  //promote student to level 400
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Pass" &&
    studentFound?.currentClassLevel === "Level 300"
  ) {
    studentFound.classLevels.push("Level 400");
    studentFound.currentClassLevel = "Level 400";
    await studentFound.save();
  }

  //promote student to graduate
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Pass" &&
    studentFound?.currentClassLevel === "Level 400"
  ) {
    studentFound.isGraduated = true;
    studentFound.yearGraduated = new Date();
    await studentFound.save();
  }

  res.status(200).json({
    status: "success",
    data: "You have submitted your exam. Check later for the results",
  });
});
