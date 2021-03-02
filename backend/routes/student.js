const express = require('express');
const router = express.Router();
const {
  registerStudent,
  authStudent,
  addRequest,
} = require('../controllers/student');
const { verifyStudent } = require('../middlewares/auth');

router.post('/', registerStudent);
router.post('/login', authStudent);
router.put('/request/:id', verifyStudent, addRequest);

module.exports = router;
