const axios = require('axios');
const BaseVectorDBAdapter = require('./baseVectorDBAdapter');

class LanceDBAdapter extends BaseVectorDBAdapter {
  constructor(config) {
    super(config);
  }

  async addDocument(doc) {
    try {
      const response = await axios.post(`${this.config.dbUrl}/documents`, doc, {
        headers: { 'Authorization': `Bearer ${this.config.apiKey}` }
      });
      console.log(`Document added successfully to LanceDB: ${response.data.id}`);
      return response.data.id;
    } catch (error) {
      console.error('Failed to add document to LanceDB:', error.message, error.stack);
      throw error;
    }
  }

  async queryDocuments(query) {
    try {
      const response = await axios.get(`${this.config.dbUrl}/search`, {
        params: { query: query },
        headers: { 'Authorization': `Bearer ${this.config.apiKey}` }
      });
      console.log(`Query executed successfully in LanceDB. Found ${response.data.length} documents.`);
      return response.data.documents;
    } catch (error) {
      console.error('Failed to query documents in LanceDB:', error.message, error.stack);
      throw error;
    }
  }
}

module.exports = LanceDBAdapter;