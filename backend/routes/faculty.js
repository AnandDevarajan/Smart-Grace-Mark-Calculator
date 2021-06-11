const express = require("express");
const router = express.Router();
const {
  registerFaculty,
  authFaculty,
  resetPassword,
  newPassword,
  updateFacultyProfile,
  getFaculty,
  changePassword,
  facultyDeleteAccount,
  facultyStatus,
  updateComplete,
  getAllFacultyStatus,
} = require("../controllers/faculty");
const {
  batchStudents,
  courseStudents,
  courseStudentsMarks,
} = require("../controllers/student");
const { verifyFaculty, faculty } = require("../middlewares/auth");

// router.post("/", registerFaculty);
router.post("/resetpassword", resetPassword);
router.post("/newpassword", newPassword);
router.get("/status", getAllFacultyStatus);
router.post("/login", authFaculty);
router.get("/students/:id", verifyFaculty, faculty, courseStudents);
router.get("/course/mark/:id", courseStudentsMarks);
router.get("/adviser/students/:id", verifyFaculty, batchStudents);
router.get("/:id", getFaculty);
router.get("/status/:id", facultyStatus);
router.put("/:id", updateFacultyProfile);
router.put("/changepassword/:id", changePassword);
router.put("/complete/:id", updateComplete);
router.delete("/delete/account/:id", facultyDeleteAccount);
module.exports = router;
