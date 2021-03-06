const express = require('express');
const router = express.Router();
const {
  registerFaculty,
  authFaculty,
  resetPassword,
  newPassword,
} = require('../controllers/faculty');
const { batchStudents } = require('../controllers/student');
const { verifyFaculty, faculty } = require('../middlewares/auth');

router.post('/', registerFaculty);
router.post('/resetpassword', resetPassword);
router.post('/newpassword', newPassword);
router.post('/login', authFaculty);
router.get('/adviser/students/:id', verifyFaculty, faculty, batchStudents);
module.exports = router;
