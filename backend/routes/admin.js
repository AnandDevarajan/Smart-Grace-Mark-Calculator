const express = require('express');
const router = express.Router();
const { verifyAdmin, admin } = require('../middlewares/auth');
const { registerAdmin, authAdmin } = require('../controllers/admin');
const { getAllStudents } = require('../controllers/student');

router.post('/', registerAdmin);
router.post('/login', authAdmin);
router.get('/students', verifyAdmin, admin, getAllStudents);
module.exports = router;
