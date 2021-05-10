const express = require("express");
const router = express.Router();
const {
  registerStudent,
  authStudent,
  addRequest,
  getStudent,
  resetPassword,
  newPassword,
  courseStudentsMarks,
  updateStudentProfile,
  changePassword,
  getStudentGrade,
  deleteAccount,
  cancelRequest,
  getGraceInfo,
  calculateNewGrade,
  calculateCGPA,
  getCgpaCount,
} = require("../controllers/student");
const { verifyStudent } = require("../middlewares/auth");

router.post("/", registerStudent);
router.post("/login", authStudent);
router.get("/cgpa/count", getCgpaCount);
router.post("/resetpassword", resetPassword);
router.post("/newpassword", newPassword);
router.get("/:id", getStudent);
router.get("/view/result/:id", getStudentGrade);
router.get("/grace/info/:id", getGraceInfo);
router.put("/:id", updateStudentProfile);
router.put("/changepassword/:id", changePassword);
router.put("/cancel/request/:id", cancelRequest);
router.put("/request/:id", verifyStudent, addRequest);
router.put("/caluclate/new/grade/:id", calculateNewGrade);
router.put("/caluclate/cgpa/:id", calculateCGPA);
router.delete("/delete/account/:id", deleteAccount);

module.exports = router;
