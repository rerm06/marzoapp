const axios = require('axios');
const BaseLLMAdapter = require('./baseLLMAdapter');

class OpenAIAdapter extends BaseLLMAdapter {
  constructor(config) {
    super(config);
  }

  async query(text) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        { prompt: text, max_tokens: 50 },
        { headers: { Authorization: `Bearer ${this.config.apiKey}` } }
      );
      console.log('OpenAI query successful:', response.data.choices[0].text);
      return response.data.choices[0].text;
    } catch (error) {
      console.error('Error querying OpenAI:', error.message, error.stack);
      throw error;
    }
  }

  async conversation(context) {
    // Implement conversation logic similar to query, potentially with a maintained context
    console.log('OpenAI conversation method called, but not implemented.');
    throw new Error('Conversation method not implemented');
  }
}

module.exports = OpenAIAdapter;