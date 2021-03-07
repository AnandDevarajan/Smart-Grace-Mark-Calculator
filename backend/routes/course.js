const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  addCourseMarks,
  getCourseMark,
} = require('../controllers/course');
const { verifyFaculty, faculty } = require('../middlewares/auth');
router.get('/', getAllCourses);
router.get('/markList/:id', getCourseMark);
router.post('/marks/:id', verifyFaculty, faculty, addCourseMarks);

module.exports = router;
