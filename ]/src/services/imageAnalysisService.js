require('dotenv').config();
const vision = require('@google-cloud/vision');

class ImageAnalysisService {
  constructor() {
    this.client = new vision.ImageAnnotatorClient({
      keyFilename: process.env.GOOGLE_CLOUD_VISION_API_KEY_PATH // Asegúrate de que esta ruta esté correctamente configurada en tu .env
    });
  }

  // Método existente para analizar una única imagen
  async analyzeImage(imageBuffer) {
    try {
      console.log('Starting image analysis...');
      const [result] = await this.client.labelDetection({ image: { content: imageBuffer } });
      const labels = result.labelAnnotations;
      console.log('Image analysis completed successfully.');
      return labels.map(label => label.description);
    } catch (error) {
      console.error('Error analyzing image:', error.message, error.stack);
      throw error;
    }
  }

  // Nuevo método para analizar múltiples imágenes
  async analyzeMultipleImages(imageBuffers) {
    try {
      console.log('Starting analysis of multiple images...');
      const results = await Promise.all(
        imageBuffers.map(imageBuffer =>
          this.client.labelDetection({ image: { content: imageBuffer } })
            .then(response => response[0].labelAnnotations.map(label => label.description))
        )
      );
      console.log('Analysis of multiple images completed successfully.');
      // Aquí se aplana el array de resultados para obtener una lista única de etiquetas
      // Esto puede ser ajustado según cómo desees utilizar los resultados
      return results.flat();
    } catch (error) {
      console.error('Error analyzing multiple images:', error.message, error.stack);
      throw error;
    }
  }
}

module.exports = new ImageAnalysisService();
