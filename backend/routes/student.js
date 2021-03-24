const express = require('express');
const router = express.Router();
const {
  registerStudent,
  authStudent,
  addRequest,
  getStudent,
  resetPassword,
  newPassword,
  courseStudentsMarks,
  editStudentProfile
} = require('../controllers/student');
const { verifyStudent } = require('../middlewares/auth');

router.post('/', registerStudent);
router.post('/login', authStudent);
router.post('/resetpassword', resetPassword);
router.post('/newpassword', newPassword);
router.post('/edit/profile/:id', editStudentProfile);
router.get('/:id', getStudent);
router.put('/request/:id', verifyStudent, addRequest);

module.exports = router;
