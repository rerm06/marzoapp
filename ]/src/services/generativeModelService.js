const axios = require('axios');

class GenerativeModelService {
  constructor() {
    this.dalleEndpointUrl = process.env.DALLE_ENDPOINT_URL; // Use environment variables for DALL-E model endpoint URL
    this.dalleApiKey = process.env.DALLE_API_KEY; // Use environment variables for DALL-E API Key
  }

  async generateDesigns(analysisResults) {
    try {
      const prompt = this._createPromptFromAnalysis(analysisResults);
      console.log(`Generated prompt for design generation: ${prompt}`);

      const generatedImages = await this._requestDesignGeneration(prompt);
      console.log('Generated images successfully from DALL-E.');

      return generatedImages;
    } catch (error) {
      console.error('Error generating designs with Generative Model Service:', error.message, error.stack);
      throw new Error('Failed to generate designs using generative model.');
    }
  }

  _createPromptFromAnalysis(analysisResults) {
    // Example: Transforming analysis results into a descriptive text prompt for the generative model.
    // This function should be adapted based on the actual structure of analysisResults and the requirements of the generative model.
    const features = analysisResults.map(feature => feature).join(', ');
    const prompt = `A door design with features: ${features}`;
    return prompt;
  }

  async _requestDesignGeneration(prompt) {
    try {
      const response = await axios.post(this.dalleEndpointUrl, {
        prompt: prompt,
        num_images: 4, // Requesting 4 images as an example
      }, {
        headers: {
          'Authorization': `Bearer ${this.dalleApiKey}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status !== 200) {
        console.error('Non-200 response from DALL-E service: ', response.status);
        throw new Error('DALL-E service responded with an error.');
      }

      return response.data.generated_images; // Assuming the API returns an object with a 'generated_images' array
    } catch (error) {
      console.error('Error requesting design generation from DALL-E:', error.response.data, error.message, error.stack);
      throw new Error('Failed to request design generation from DALL-E.');
    }
  }
}

module.exports = new GenerativeModelService();