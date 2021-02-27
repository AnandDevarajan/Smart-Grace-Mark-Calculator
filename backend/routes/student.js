const express = require('express');
const router = express.Router();
const { registerStudent, authStudent } = require('../controllers/student');

router.post('/', registerStudent);
router.post('/login', authStudent);

module.exports = router;
