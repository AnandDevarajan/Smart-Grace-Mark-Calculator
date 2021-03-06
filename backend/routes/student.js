const express = require('express');
const router = express.Router();
const {
  registerStudent,
  authStudent,
  addRequest,
  getStudent,
  resetPassword,
  newPassword,
} = require('../controllers/student');
const { verifyStudent } = require('../middlewares/auth');

router.post('/', registerStudent);
router.post('/login', authStudent);
router.post('/resetpassword', resetPassword);
router.post('/newpassword', newPassword);
router.get('/:id', getStudent);
router.put('/request/:id', verifyStudent, addRequest);

module.exports = router;
