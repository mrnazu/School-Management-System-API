const express = require("express");
const {
  createClassLevel,
  deleteClassLevel,
  getClassLevel,
  getClassLevels,
  updateclassLevel,
} = require("../../controller/academics/classLevel");

const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const classLevelRouter = express.Router();

// academicTerRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicTerRouter.get("/", isLogin, isAdmin, getAcademicYears);

classLevelRouter
  .route("/")
  .post(isLogin, isAdmin, createClassLevel)
  .get(isLogin, isAdmin, getClassLevels);

classLevelRouter
  .route("/:id")
  .get(isLogin, isAdmin, getClassLevel)
  .put(isLogin, isAdmin, updateclassLevel)
  .delete(isLogin, isAdmin, deleteClassLevel);

// academicTerRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicTerRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicTerRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = classLevelRouter;
