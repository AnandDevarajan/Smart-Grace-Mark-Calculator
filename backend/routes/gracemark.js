const express = require("express");
const router = express.Router();
const {
  createGraceMark,
  getAllGraceMarks,
  getGraceMarkDetails,
  updateGraceMarkDetails,
  deleteGraceMarkDetails,
} = require("../controllers/gracemark");
const { verifyAdmin, admin } = require("../middlewares/auth");
router.post("/", verifyAdmin, admin, createGraceMark);
router.get("/", getAllGraceMarks);
router.get("/:id", getGraceMarkDetails);
router.put("/:id", verifyAdmin, admin, updateGraceMarkDetails);
router.delete("/:id", verifyAdmin, admin, deleteGraceMarkDetails);
module.exports = router;
