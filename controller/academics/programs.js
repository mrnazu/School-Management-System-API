const AysncHandler = require("express-async-handler");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Program = require("../../model/Academic/Program");
const Subject = require("../../model/Academic/Subject");
const Admin = require("../../model/Staff/Admin");

//@desc  Create Program
//@route POST /api/v1/programs
//@acess  Private

exports.createProgram = AysncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check if exists
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error("Program  already exists");
  }
  //create
  const programCreated = await Program.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });
  //push program into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.programs.push(programCreated._id);
  //save
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Program created successfully",
    data: programCreated,
  });
});

//@desc  get all Programs
//@route GET /api/v1/programs
//@acess  Private

exports.getPrograms = AysncHandler(async (req, res) => {
  const programs = await Program.find();
  res.status(201).json({
    status: "success",
    message: "Programs fetched successfully",
    data: programs,
  });
});

//@desc  get single Program
//@route GET /api/v1/programs/:id
//@acess  Private
exports.getProgram = AysncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Program fetched successfully",
    data: program,
  });
});

//@desc   Update  Program
//@route  PUT /api/v1/programs/:id
//@acess  Private

exports.updatProgram = AysncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check name exists
  const programFound = await ClassLevel.findOne({ name });
  if (programFound) {
    throw new Error("Program already exists");
  }
  const program = await Program.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Program  updated successfully",
    data: program,
  });
});

//@desc   Delete  Program
//@route  PUT /api/v1/programs/:id
//@acess  Private
exports.deleteProgram = AysncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Program deleted successfully",
  });
});
//@desc   Add subject to Program
//@route  PUT /api/v1/programs/:id/subjects
//@acess  Private
exports.addSubjectToProgram = AysncHandler(async (req, res) => {
  const { name } = req.body;
  //get the program
  const program = await Program.findById(req.params.id);
  if (!program) {
    throw new Error("Program not found");
  }
  //Find the subject
  const subjectFound = await Subject.findOne({ name });
  if (!subjectFound) {
    throw new Error("Subject not found");
  }
  //Check if subject exists
  const subjectExists = program.subjects?.find(
    sub => sub?.toString() === subjectFound?._id.toString()
  );
  if (subjectExists) {
    throw new Error("Subject already exists");
  }
  //push the subj into program
  program.subjects.push(subjectFound?._id);
  //save
  await program.save();
  res.status(201).json({
    status: "success",
    message: "Subject added successfully",
    data: program,
  });
});
