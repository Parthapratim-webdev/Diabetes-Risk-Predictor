const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const store = require('../services/store');

const JWT_SECRET = process.env.JWT_SECRET || 'drp_jwt_secret_dev_key_2026';

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await store.findUserByEmail(cleanEmail);

    if (existing && existing.password) {
      return res.status(409).json({ message: 'An account with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await store.createUser({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: 'User',
      avatarInitials: getInitials(name),
      notifications: {
        emailReports: true,
        healthTips: true,
        reminders: false,
      },
      privacySettings: {
        shareTelemetry: false,
        demoModeActive: false,
      },
    });

    const { password: _, ...safeUser } = newUser;
    const token = generateToken(newUser.id || newUser._id, cleanEmail);

    res.status(201).json({
      success: true,
      user: safeUser,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error while creating account.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await store.findUserByEmail(cleanEmail);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
    }

    // Demo account special check
    const isDemoEmail = cleanEmail === 'alex.morgan@healthportal.demo';
    if (!isDemoEmail) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
      }
    }

    const { password: _, ...safeUser } = user;
    const token = generateToken(user.id || user._id, cleanEmail);

    res.status(200).json({
      success: true,
      user: safeUser,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error during login.' });
  }
};

const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No active session.' });
  }
  res.status(200).json({ user: req.user });
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const user = await store.findUserById(req.user.id || req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.password) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password does not match.' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await store.updateUser(user.id || user._id, { password: hashedPassword });

    res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Could not change password.' });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully.' });
};

module.exports = {
  register,
  login,
  getMe,
  changePassword,
  logout,
};
