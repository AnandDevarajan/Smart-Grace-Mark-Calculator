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
  updateStudentProfile,
  changePassword,
  getStudentGrade,
  deleteAccount,
} = require('../controllers/student');
const { verifyStudent } = require('../middlewares/auth');

router.post('/', registerStudent);
router.post('/login', authStudent);
router.post('/resetpassword', resetPassword);
router.post('/newpassword', newPassword);
router.get('/:id', getStudent);
router.get('/view/result/:id', getStudentGrade);
router.put('/:id', updateStudentProfile);
router.put('/changepassword/:id', changePassword);
router.put('/request/:id', verifyStudent, addRequest);
router.delete('/delete/account/:id', deleteAccount);

module.exports = router;
