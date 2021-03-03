const express = require('express');
const router = express.Router();
const {
  createGraceMark,
  getAllGraceMarks,
  getGraceMarkDetails,
  updateGraceMarkDetails,
} = require('../controllers/gracemark');
const { verifyAdmin, admin } = require('../middlewares/auth');
router.post('/', verifyAdmin, admin, createGraceMark);
router.get('/', getAllGraceMarks);
router.get('/:id', getGraceMarkDetails);
router.put('/:id', updateGraceMarkDetails);
router.delete('/:id', deleteGraceMarkDetails);
module.exports = router;
