const express = require('express');
const router = express.Router();
const { createGraceMark } = require('../controllers/gracemark');
const { verifyAdmin, admin } = require('../middlewares/auth');
router.post('/', verifyAdmin, admin, createGraceMark);
module.exports = router;
