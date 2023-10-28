const AysncHandler = require("express-async-handler");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Admin = require("../../model/Staff/Admin");

//@desc  Create Class Level
//@route POST /api/v1/class-levels
//@acess  Private
exports.createClassLevel = AysncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  //check if exists
  const classFound = await ClassLevel.findOne({ name });
  if (classFound) {
    throw new Error("Class  already exists");
  }
  //create
  const classCreated = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });
  //push class into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.classLevels.push(classCreated._id);
  //save
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Class created successfully",
    data: classCreated,
  });
});

//@desc  get all class levels
//@route GET /api/v1/class-levels
//@acess  Private
exports.getClassLevels = AysncHandler(async (req, res) => {
  const classes = await ClassLevel.find();
  res.status(201).json({
    status: "success",
    message: "Class Levels fetched successfully",
    data: classes,
  });
});

//@desc  get single Class level
//@route GET /api/v1/class-levels/:id
//@acess  Private
exports.getClassLevel = AysncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Class fetched successfully",
    data: classLevel,
  });
});

//@desc   Update  Class Level
//@route  PUT /api/v1/class-levels/:id
//@acess  Private

exports.updateclassLevel = AysncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check name exists
  const classFound = await ClassLevel.findOne({ name });
  if (classFound) {
    throw new Error("Class already exists");
  }
  const classLevel = await ClassLevel.findByIdAndUpdate(
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
    message: "Class  updated successfully",
    data: classLevel,
  });
});

//@desc   Delete  class level
//@route  PUT /api/v1/aclass-levels/:id
//@acess  Private
exports.deleteClassLevel = AysncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Class level deleted successfully",
  });
});
