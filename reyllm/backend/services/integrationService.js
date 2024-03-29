const OpenAIAdapter = require('../adapters/llmAdapters/openAIAdapter');
const LanceDBAdapter = require('../adapters/vectorDBAdapters/lanceDBAdapter');

class IntegrationService {
  constructor() {
    const llmConfig = { apiKey: process.env.OPENAI_API_KEY }; {'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'}
    const vectorDBConfig = { apiKey: process.env.LANCEDB_API_KEY }; // INPUT_REQUIRED {Provide your LanceDB API key}
    this.llmAdapter = new OpenAIAdapter(llmConfig);
    this.vectorDBAdapter = new LanceDBAdapter(vectorDBConfig);
  }

  async queryLLM(text) {
    try {
      const response = await this.llmAdapter.query(text);
      console.log('LLM query successful:', response);
      return response;
    } catch (error) {
      console.error('Error querying LLM:', error.message, error.stack);
      throw error;
    }
  }

  async addDocumentToDB(doc) {
    try {
      const response = await this.vectorDBAdapter.addDocument(doc);
      console.log('Document added to database successfully:', response);
      return response;
    } catch (error) {
      console.error('Error adding document to database:', error.message, error.stack);
      throw error;
    }
  }

  // Additional methods for conversation management, etc. can be implemented here
}

module.exports = new IntegrationService();