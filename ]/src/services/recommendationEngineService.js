const tf = require('@tensorflow/tfjs');
const knnClassifier = require('@tensorflow-models/knn-classifier');

class RecommendationEngine {
  constructor() {
    this.classifier = knnClassifier.create();
    this.designs = [];
    console.log('Recommendation Engine Initialized');
  }

  async addDesignExample(designParams, label) {
    try {
      const tensor = tf.tensor(designParams);
      this.classifier.addExample(tensor, label);
      this.designs.push({ designParams, label });
      console.log(`Design example added for label: ${label}`);
    } catch (error) {
      console.error('Error adding design example:', error.message, error.stack);
    }
  }

  async recommendDesigns(userPreferences) {
    try {
      const tensor = tf.tensor(userPreferences);
      const prediction = await this.classifier.predictClass(tensor);
      const recommendedDesigns = this.designs.filter(design => design.label === prediction.label);
      console.log(`Recommended designs for label: ${prediction.label}`);
      return recommendedDesigns;
    } catch (error) {
      console.error('Error recommending designs:', error.message, error.stack);
      throw error;
    }
  }
}

module.exports = new RecommendationEngine();