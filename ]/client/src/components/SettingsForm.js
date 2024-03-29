import React, { useState } from 'react';
import axios from 'axios';

function SettingsForm() {
  const [googleCloudVisionApiKey, setGoogleCloudVisionApiKey] = useState('');
  const [dalleApiKey, setDalleApiKey] = useState('');
  const [googleCloudVisionEndpointUrl, setGoogleCloudVisionEndpointUrl] = useState('');
  const [dalleEndpointUrl, setDalleEndpointUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/settings`, {
        googleCloudVisionApiKey,
        dalleApiKey,
        googleCloudVisionEndpointUrl,
        dalleEndpointUrl,
      });
      console.log('Settings saved successfully:', response.data);
      alert('Settings updated successfully.');
    } catch (error) {
      console.error('Error saving settings:', error.response.data.message, error.stack);
      alert('Failed to update settings. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Google Cloud Vision API Key:</label>
        <input type="text" value={googleCloudVisionApiKey} onChange={(e) => setGoogleCloudVisionApiKey(e.target.value)} required />
      </div>
      <div>
        <label>DALL-E API Key:</label>
        <input type="text" value={dalleApiKey} onChange={(e) => setDalleApiKey(e.target.value)} required />
      </div>
      <div>
        <label>Google Cloud Vision Endpoint URL:</label>
        <input type="text" value={googleCloudVisionEndpointUrl} onChange={(e) => setGoogleCloudVisionEndpointUrl(e.target.value)} required />
      </div>
      <div>
        <label>DALL-E Endpoint URL:</label>
        <input type="text" value={dalleEndpointUrl} onChange={(e) => setDalleEndpointUrl(e.target.value)} required />
      </div>
      <button type="submit">Save Settings</button>
    </form>
  );
}

export default SettingsForm;