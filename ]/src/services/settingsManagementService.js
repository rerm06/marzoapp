const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  googleCloudVisionApiKey: { type: String, required: true },
  dalleApiKey: { type: String, required: true },
  googleCloudVisionEndpointUrl: { type: String, required: true },
  dalleEndpointUrl: { type: String, required: true }
});

const Settings = mongoose.model('Settings', settingsSchema);

class SettingsManagementService {
  async saveSettings(userId, settings) {
    try {
      const existingSettings = await Settings.findOne({ userId });
      if (existingSettings) {
        existingSettings.googleCloudVisionApiKey = settings.googleCloudVisionApiKey;
        existingSettings.dalleApiKey = settings.dalleApiKey;
        existingSettings.googleCloudVisionEndpointUrl = settings.googleCloudVisionEndpointUrl;
        existingSettings.dalleEndpointUrl = settings.dalleEndpointUrl;
        await existingSettings.save();
        console.log('Settings updated successfully');
      } else {
        const newSettings = new Settings({ userId, ...settings });
        await newSettings.save();
        console.log('Settings saved successfully');
      }
    } catch (error) {
      console.error('Error saving settings:', error.message, error.stack);
      throw error;
    }
  }

  async getSettings(userId) {
    try {
      const settings = await Settings.findOne({ userId });
      if (!settings) {
        console.log('No settings found for user');
        return null;
      }
      console.log('Settings retrieved successfully');
      return settings;
    } catch (error) {
      console.error('Error retrieving settings:', error.message, error.stack);
      throw error;
    }
  }
}

module.exports = new SettingsManagementService();