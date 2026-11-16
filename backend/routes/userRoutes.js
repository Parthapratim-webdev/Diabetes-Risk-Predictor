const express = require('express');
const { updateProfile } = require('../controllers/userController');
const { authMiddleware, requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/profile', authMiddleware, requireAuth, updateProfile);

module.exports = router;
