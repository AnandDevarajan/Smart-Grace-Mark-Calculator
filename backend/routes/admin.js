const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middlewares/auth');
const { registerAdmin, authAdmin } = require('../controllers/admin');

router.post('/', registerAdmin);
router.post('/login', authAdmin);

module.exports = router;
