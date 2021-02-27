const express = require('express');
const router = express.Router();
const { addGraceMark } = require('../controllers/gracemark');
const { verifyAdmin, admin } = require('../middlewares/auth');
router.post('/', verifyAdmin, admin, addGraceMark);
module.exports = router;
