const express = require("express");
const router = express.Router();
const { verifyAdmin, admin } = require("../middlewares/auth");
const {
  registerAdmin,
  authAdmin,
  resetPassword,
  newPassword,
  publishResults,
  getAdmin,
  updateAdminProfile,
  changePassword,
  getStatus,
  resetPublish,
  adminDeleteAccount,
  notifyFaculty,
} = require("../controllers/admin");
const {
  getAllStudents,
  acceptRequest,
  rejectRequest,
} = require("../controllers/student");
const { getAllFaculties } = require("../controllers/faculty");

// router.post("/", registerAdmin);
router.post("/login", authAdmin);
router.get("/status", getStatus);
router.get("/students", verifyAdmin, admin, getAllStudents);
router.get("/faculties", verifyAdmin, admin, getAllFaculties);
router.post("/resetpassword", resetPassword);
router.post("/newpassword", newPassword);
router.get("/publish/result", verifyAdmin, admin, publishResults);
router.get("/reset/publish", verifyAdmin, admin, resetPublish);
router.get("/student/request/accept/:id", verifyAdmin, admin, acceptRequest);
router.get("/student/request/reject/:id", verifyAdmin, admin, rejectRequest);
router.get("/:id", getAdmin);
router.put("/:id", updateAdminProfile);
router.get("/notify/faculty/:id", verifyAdmin, admin, notifyFaculty);
router.put("/changepassword/:id", changePassword);
router.delete("/delete/account/:id", adminDeleteAccount);
module.exports = router;
