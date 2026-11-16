const store = require('../services/store');

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const { name, email, notifications, privacySettings } = req.body;
    const updateData = {};

    if (name) {
      updateData.name = name.trim();
      updateData.avatarInitials = getInitials(name);
    }
    if (email) updateData.email = email.trim().toLowerCase();
    if (notifications) updateData.notifications = notifications;
    if (privacySettings) updateData.privacySettings = privacySettings;

    const updated = await store.updateUser(req.user.id || req.user._id, updateData);

    if (!updated) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    const { password: _, ...safeUser } = updated;
    res.status(200).json({ success: true, user: safeUser });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Could not update profile.' });
  }
};

module.exports = { updateProfile };
