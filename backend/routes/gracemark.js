const express = require('express');
const router = express.Router();
const {
  createGraceMark,
  getAllGraceMarks,
} = require('../controllers/gracemark');
const { verifyAdmin, admin } = require('../middlewares/auth');
router.post('/', verifyAdmin, admin, createGraceMark);
router.get('/', getAllGraceMarks);
module.exports = router;
