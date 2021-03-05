const express = require('express');
const router = express.Router();
const { registerFaculty, authFaculty } = require('../controllers/faculty');
const { batchStudents } = require('../controllers/student');
const { verifyFaculty } = require('../middlewares/auth');

router.get('/adviser/students', verifyFaculty, batchStudents);
router.post('/', registerFaculty);
router.post('/login', authFaculty);

module.exports = router;
