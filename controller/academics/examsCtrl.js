const AysncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");

//@desc  Create Exam
//@route POST /api/v1/exams
//@acess Private  Teachers only

exports.createExam = AysncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
    classLevel,
  } = req.body;
  //find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }
  //exam exists
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    throw new Error("Exam already exists");
  }
  //create
  const examCreated = new Exam({
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    createdBy,
    duration,
    examDate,
    examTime,
    examType,
    subject,
    program,
    createdBy: req.userAuth?._id,
  });
  //push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);
  //save exam
  await examCreated.save();
  await teacherFound.save();
  res.status(201).json({
    status: "success",
    message: "Exam created",
    data: examCreated,
  });
});

//@desc  get all Exams
//@route GET /api/v1/exams
//@acess  Private

exports.getExams = AysncHandler(async (req, res) => {
  const exams = await Exam.find().populate({
    path: "questions",
    populate: {
      path: "createdBy",
    },
  });
  res.status(201).json({
    status: "success",
    message: "Exams fetched successfully",
    data: exams,
  });
});

//@desc  get single exam
//@route GET /api/v1/exams/:id
//@acess  Private Teahers only

exports.getExam = AysncHandler(async (req, res) => {
  const exams = await Exam.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Exam fetched successfully",
    data: exams,
  });
});

//@desc   Update  Exam
//@route  PUT /api/v1/exams/:id
//@acess  Private  - Teacher only

exports.updatExam = AysncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
    classLevel,
  } = req.body;
  //check name exists
  const examFound = await Exam.findOne({ name });
  if (examFound) {
    throw new Error("Exam already exists");
  }

  const examUpdated = await Exam.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      subject,
      program,
      academicTerm,
      duration,
      examDate,
      examTime,
      examType,
      createdBy,
      academicYear,
      classLevel,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Exam  updated successfully",
    data: examUpdated,
  });
});
