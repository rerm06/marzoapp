// frontend/src/widget.js

import React from 'react';
import ReactDOM from 'react-dom';
import ChatWidget from './components/ChatWidget';

// Dynamically set the API URL based on the embedding site's configuration or use a default
const apiUrl = document.currentScript.getAttribute('data-api-url') || 'https://default-api-url.com';

ReactDOM.render(<ChatWidget apiUrl={apiUrl} />, document.getElementById('reyllm-chat-widget'));