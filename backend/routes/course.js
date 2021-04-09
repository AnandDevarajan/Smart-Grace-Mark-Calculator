const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  addCourseMarks,
  getCourseMark,
  getACourseMark,
  getAllDeptCourses,
  updateCourseMarkDetails,
  getCourseMarkOfStudent,
  getCourseReport,
} = require("../controllers/course");
const { verifyFaculty, faculty } = require("../middlewares/auth");
router.get("/", getAllCourses);
router.get("/report", getCourseReport);
router.get("/:id", getAllDeptCourses);
router.get("/student/marks/:id", getCourseMarkOfStudent);
router.get("/markList/:id", verifyFaculty, faculty, getCourseMark);
router.get("/mark/edit/:id", getACourseMark);
router.put("/marks/:id", verifyFaculty, faculty, addCourseMarks);
router.put("/mark/update/:id", updateCourseMarkDetails);
module.exports = router;
