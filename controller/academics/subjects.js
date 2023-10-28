const AysncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const Subject = require("../../model/Academic/Subject");
const Admin = require("../../model/Staff/Admin");

//@desc  Create subject
//@route POST /api/v1/subjects/:programID
//@acess  Private

exports.createSubject = AysncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  //find the program
  const programFound = await Program.findById(req.params.programID);
  if (!programFound) {
    throw new Error("Program  not found");
  }
  //check if exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error("Subject  already exists");
  }
  //create
  const subjectCreated = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.userAuth._id,
  });
  //push to the program
  // programFound.subjects.push(subjectCreated._id);
  //save
  await programFound.save();
  res.status(201).json({
    status: "success",
    message: "Program created successfully",
    data: subjectCreated,
  });
});

//@desc  get all Subjects
//@route GET /api/v1/subjects
//@acess  Private

exports.getSubjects = AysncHandler(async (req, res) => {
  const classes = await Subject.find();
  res.status(201).json({
    status: "success",
    message: "Subjects fetched successfully",
    data: classes,
  });
});

//@desc  get single subject
//@route GET /api/v1/subjects/:id
//@acess  Private
exports.getProgram = AysncHandler(async (req, res) => {
  const program = await Subject.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Subject fetched successfully",
    data: program,
  });
});

//@desc   Update  Subject
//@route  PUT /api/v1/subjects/:id
//@acess  Private

exports.updatSubject = AysncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  //check name exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error("Program already exists");
  }
  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "subject  updated successfully",
    data: subject,
  });
});

//@desc   Delete  Subject
//@route  PUT /api/v1/subjects/:id
//@acess  Private
exports.deleteSubject = AysncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "subject deleted successfully",
  });
});
