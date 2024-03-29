class BaseVectorDBAdapter {
  constructor(config) {
    this.config = config;
  }

  async addDocument(doc) {
    throw new Error('addDocument method not implemented');
  }

  async queryDocuments(query) {
    throw new Error('queryDocuments method not implemented');
  }
}

module.exports = BaseVectorDBAdapter;