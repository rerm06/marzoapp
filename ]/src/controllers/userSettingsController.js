const settingsManagementService = require('../services/settingsManagementService');

exports.updateUserSettings = async (req, res) => {
  try {
    const settings = req.body;
    const updatedSettings = await settingsManagementService.updateSettings(req.user.id, settings);
    console.log('User settings updated successfully:', updatedSettings);
    res.json({ success: true, message: 'Settings updated successfully', data: updatedSettings });
  } catch (error) {
    console.error('Error updating user settings:', error.message, error.stack);
    res.status(500).json({ success: false, message: 'Error updating settings', error: error.message });
  }
};

exports.getUserSettings = async (req, res) => {
  try {
    const userSettings = await settingsManagementService.getSettings(req.user.id);
    if (!userSettings) {
      console.log('No settings found for user:', req.user.id);
      return res.status(404).json({ success: false, message: 'Settings not found' });
    }
    console.log('User settings fetched successfully:', userSettings);
    res.json({ success: true, message: 'Settings fetched successfully', data: userSettings });
  } catch (error) {
    console.error('Error fetching user settings:', error.message, error.stack);
    res.status(500).json({ success: false, message: 'Error fetching settings', error: error.message });
  }
};

exports.addUserSettings = async (req, res) => {
  try {
    const settings = req.body;
    const newSettings = await settingsManagementService.addSettings(req.user.id, settings);
    console.log('User settings added successfully:', newSettings);
    res.status(201).json({ success: true, message: 'Settings added successfully', data: newSettings });
  } catch (error) {
    console.error('Error adding user settings:', error.message, error.stack);
    res.status(500).json({ success: false, message: 'Error adding settings', error: error.message });
  }
};