const express = require('express');
const router = express.Router();
const { registerStudent, authStudent } = require('../controllers/student');
const { verifyAuth } = require('../middlewares/auth');

router.post('/', registerStudent);
router.get('/', verifyAuth, (req, res) => {
  res.json({
    msg: 'Protected',
  });
});
router.post('/login', authStudent);

module.exports = router;
