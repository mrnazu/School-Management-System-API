const AysncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

//@desc Create Academic Year
//@route POST /api/v1/academic-years
//@acess  Private
exports.createAcademicYear = AysncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  //check if exists
  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) {
    throw new Error("Academic year already exists");
  }
  //create
  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  });
  //push academic into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicYears.push(academicYearCreated._id);
  await admin.save();
  res.status(201).json({
    status: "success",
    message: "Academic year created successfully",
    data: academicYearCreated,
  });
});

//@desc  get all Academic Years
//@route GET /api/v1/academic-years
//@acess  Private
exports.getAcademicYears = AysncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();

  res.status(201).json({
    status: "success",
    message: "Academic years fetched successfully",
    data: academicYears,
  });
});

//@desc  get single Academic Year
//@route GET /api/v1/academic-years/:id
//@acess  Private
exports.getAcademicYear = AysncHandler(async (req, res) => {
  const academicYears = await AcademicYear.findById(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Academic years fetched successfully",
    data: academicYears,
  });
});

//@desc   Update  Academic Year
//@route  PUT /api/v1/academic-years/:id
//@acess  Private
exports.updateAcademicYear = AysncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  //check name exists
  const createAcademicYearFound = await AcademicYear.findOne({ name });
  if (createAcademicYearFound) {
    throw new Error("Academic year already exists");
  }
  const academicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Academic years updated successfully",
    data: academicYear,
  });
});

//@desc   Update  Academic Year
//@route  PUT /api/v1/academic-years/:id
//@acess  Private
exports.deleteAcademicYear = AysncHandler(async (req, res) => {
  await AcademicYear.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Academic year deleted successfully",
  });
});
