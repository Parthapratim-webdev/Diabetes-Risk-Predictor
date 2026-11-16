const jwt = require('jsonwebtoken');
const store = require('../services/store');

const JWT_SECRET = process.env.JWT_SECRET || 'drp_jwt_secret_dev_key_2026';

const authMiddleware = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // Allows guest or unauthenticated access while flagging req.user as null
    req.user = null;
    return next();
  }

  // Handle demo preview tokens
  if (token === 'guest_demo_preview_token' || token === 'demo_active_token') {
    const demoUser = await store.findUserByEmail('alex.morgan@healthportal.demo');
    req.user = demoUser || { id: 'usr_guest_demo', name: 'Alex Morgan', role: 'User' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await store.findUserById(decoded.id);
    if (user) {
      const { password, ...safeUser } = user;
      req.user = safeUser;
    } else {
      req.user = { id: decoded.id, email: decoded.email, role: 'User' };
    }
    next();
  } catch (error) {
    // If token expired or invalid, still allow guest path
    req.user = null;
    next();
  }
};

const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required. Please log in.' });
  }
  next();
};

module.exports = { authMiddleware, requireAuth };
