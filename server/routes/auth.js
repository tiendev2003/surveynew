const express = require('express');
const { register, login, getUserInfo,   updateUserProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getUserInfo); // Lấy thông tin người dùng hiện tại
router.put('/me', authenticateToken, updateUserProfile);
router.get("/check", authenticateToken, (req, res) => {
  res.json({ message: "success" });
});
module.exports = router;
