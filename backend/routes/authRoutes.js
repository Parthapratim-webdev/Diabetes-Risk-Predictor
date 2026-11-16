const express = require('express');
const { register, login, getMe, changePassword, logout } = require('../controllers/authController');
const { authMiddleware, requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.post('/change-password', authMiddleware, requireAuth, changePassword);
router.post('/logout', logout);

module.exports = router;
