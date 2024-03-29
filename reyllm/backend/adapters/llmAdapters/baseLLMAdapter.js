class BaseLLMAdapter {
  constructor(config) {
    this.config = config;
  }

  async query(text) {
    throw new Error('Query method not implemented');
  }

  async conversation(context) {
    throw new Error('Conversation method not implemented');
  }
}

module.exports = BaseLLMAdapter;