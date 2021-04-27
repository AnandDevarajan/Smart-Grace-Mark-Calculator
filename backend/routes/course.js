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
  getACourseReport,
  getGradeRange,
  updateGradeRange,
  getAllGradeRange,
  getRangeDetails,
  updateGrade,
  editGradeRange,
} = require("../controllers/course");
const { verifyFaculty, faculty, verifyAdmin } = require("../middlewares/auth");
router.get("/", getAllCourses);
router.get("/report", getCourseReport);
router.get("/all/graderange", getAllGradeRange);
router.get("/get/report/:id", getACourseReport);
router.get("/graderange/:id", getGradeRange);
router.get("/:id", getAllDeptCourses);
router.get("/range/details/:id", getRangeDetails);
router.get("/student/marks/:id", getCourseMarkOfStudent);
router.get("/markList/:id", verifyFaculty, faculty, getCourseMark);
router.get("/mark/edit/:id", getACourseMark);
router.put("/marks/:id", verifyFaculty, faculty, addCourseMarks);
router.put("/update/grade/:id", updateGrade);
router.put("/graderange/:id", verifyAdmin, updateGradeRange);
router.put("/mark/update/:id", updateCourseMarkDetails);
router.put("/edit/graderange/:id", editGradeRange);
module.exports = router;
