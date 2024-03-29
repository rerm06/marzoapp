const express = require('express');
const router = express.Router();
const userSettingsController = require('../controllers/userSettingsController');

// Route to add new user settings
router.post('/add', async (req, res) => {
  try {
    const settings = await userSettingsController.addUserSettings(req.body);
    console.log('User settings added successfully');
    res.json({ success: true, settings });
  } catch (error) {
    console.error('Error adding user settings:', error.message, error.stack);
    res.status(500).json({ success: false, message: 'Error adding user settings', error: error.message });
  }
});

// Route to update existing user settings
router.put('/update/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedSettings = await userSettingsController.updateUserSettings(userId, req.body);
    console.log(`User settings for userId ${userId} updated successfully`);
    res.json({ success: true, updatedSettings });
  } catch (error) {
    console.error('Error updating user settings:', error.message, error.stack);
    res.status(500).json({ success: false, message: 'Error updating user settings', error: error.message });
  }
});

// Route to get user settings
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const settings = await userSettingsController.getUserSettings(userId);
    if (!settings) {
      console.log(`No settings found for userId ${userId}`);
      return res.status(404).json({ success: false, message: 'Settings not found' });
    }
    console.log(`Settings retrieved for userId ${userId}`);
    res.json({ success: true, settings });
  } catch (error) {
    console.error('Error retrieving user settings:', error.message, error.stack);
    res.status(500).json({ success: false, message: 'Error retrieving user settings', error: error.message });
  }
});

module.exports = router;