const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  addCourseMarks,
  getCourseMark,
  getACourseMark,
  updateCourseMarkDetails,
} = require('../controllers/course');
const { verifyFaculty, faculty } = require('../middlewares/auth');
router.get('/', getAllCourses);
router.get('/markList/:id', verifyFaculty, faculty, getCourseMark);
router.post('/marks/:id', verifyFaculty, faculty, addCourseMarks);
router.post('/mark/edit/:id', getACourseMark);
router.put('/mark/update/:id', updateCourseMarkDetails);

module.exports = router;
