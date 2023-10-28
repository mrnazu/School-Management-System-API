const AysncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const Subject = require("../../model/Academic/Subject");
const YearGroup = require("../../model/Academic/YearGroup");
const Admin = require("../../model/Staff/Admin");

//@desc  Create year group
//@route POST /api/v1/year-groups
//@acess  Private

exports.createYearGroup = AysncHandler(async (req, res) => {
  const { name, academicYear } = req.body;

  //check if exists
  const yeargroup = await YearGroup.findOne({ name });
  if (yeargroup) {
    throw new Error("Year Group/Graduation   already exists");
  }
  //create
  const yearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });
  //push to the program
  //find the admin
  const admin = await Admin.findById(req.userAuth._id);
  if (!admin) {
    throw new Error("Admin not found");
  }
  //push year froup into admin
  admin.yearGroups.push(yearGroup._id);
  //save
  await admin.save();
  res.status(201).json({
    status: "success",
    message: "Year Group created successfully",
    data: yearGroup,
  });
});

//@desc  get all Year grups
//@route GET /api/v1/year-groups
//@acess  Private

exports.getYearGroups = AysncHandler(async (req, res) => {
  const groups = await YearGroup.find();
  res.status(201).json({
    status: "success",
    message: "Year Groups fetched successfully",
    data: groups,
  });
});

//@desc  get single year group
//@route GET /api/v1/year-group/:id
//@acess  Private

exports.getYearGroup = AysncHandler(async (req, res) => {
  const group = await YearGroup.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Year Group fetched successfully",
    data: group,
  });
});

//@desc   Update  Year Group
//@route  PUT /api/v1/year-groups/:id
//@acess  Private

exports.updateYearGroup = AysncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  //check name exists
  const yearGroupFound = await YearGroup.findOne({ name });
  if (yearGroupFound) {
    throw new Error("year Group already exists");
  }
  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Year Group  updated successfully",
    data: yearGroup,
  });
});

//@desc   Delete  Year group
//@route  PUT /api/v1/year-groups/:id
//@acess  Private
exports.deleteYearGroup = AysncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Year Group deleted successfully",
  });
});
