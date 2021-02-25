const express = require('express');
const router = express.Router();
const { registerFaculty, authFaculty } = require('../controllers/faculty');
const { verifyAuth } = require('../middlewares/auth');

router.post('/', registerFaculty);
router.post('/login', authFaculty);

module.exports = router;
