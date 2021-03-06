const express = require('express');
const router = express.Router();
const { verifyAdmin, admin } = require('../middlewares/auth');
const {
  registerAdmin,
  authAdmin,
  resetPassword,
  newPassword,
  publishResults,
} = require('../controllers/admin');
const {
  getAllStudents,
  acceptRequest,
  rejectRequest,
} = require('../controllers/student');
const { getAllFaculties } = require('../controllers/faculty');

router.post('/', registerAdmin);
router.post('/login', authAdmin);
router.get('/students', verifyAdmin, admin, getAllStudents);
router.get('/faculties', verifyAdmin, admin, getAllFaculties);
router.post('/resetpassword', resetPassword);
router.post('/newpassword', newPassword);
router.get('/publish/result', verifyAdmin, admin, publishResults);
router.get('/student/request/accept/:id', verifyAdmin, admin, acceptRequest);
router.get('/student/request/reject/:id', verifyAdmin, admin, rejectRequest);
module.exports = router;
