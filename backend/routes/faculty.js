const express = require('express');
const router = express.Router();
const {
  registerFaculty,
  authFaculty,
  resetPassword,
  newPassword,
  updateFacultyProfile,
  getFaculty,
  changePassword,
} = require('../controllers/faculty');
const {
  batchStudents,
  courseStudents,
  courseStudentsMarks,
} = require('../controllers/student');
const { verifyFaculty, faculty } = require('../middlewares/auth');

router.post('/', registerFaculty);
router.post('/resetpassword', resetPassword);
router.post('/newpassword', newPassword);
router.post('/login', authFaculty);
router.get('/students/:id', verifyFaculty, faculty, courseStudents);
router.get('/course/mark/:id', courseStudentsMarks);
router.get('/adviser/students/:id', verifyFaculty, faculty, batchStudents);
router.get('/:id', getFaculty);
router.put('/:id', updateFacultyProfile);
router.put('/changepassword/:id', changePassword);
module.exports = router;
