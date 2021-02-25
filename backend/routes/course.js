const express = require('express');
const router = express.Router();
const { getAllCourses } = require('../controllers/course');
router.get('/', getAllCourses);
module.exports = router;
