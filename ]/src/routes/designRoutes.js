const express = require('express');
const multer = require('multer');
const recommendationEngineService = require('../services/recommendationEngineService');
const imageAnalysisService = require('../services/imageAnalysisService');
const generativeModelService = require('../services/generativeModelService');
const router = express.Router();

// Configure multer for image upload
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 * 5 } });

router.post('/recommend', async (req, res) => {
  try {
    const { userPreferences } = req.body;
    const recommendedDesigns = await recommendationEngineService.recommendDesigns(userPreferences);
    console.log(`Recommended designs successfully generated for user preferences: ${JSON.stringify(userPreferences)}`);
    res.json({ success: true, recommendedDesigns });
  } catch (error) {
    console.error('Error recommending designs:', error.message, error.stack);
    res.status(500).json({ success: false, message: 'Error recommending designs', error: error.message });
  }
});

router.post('/upload-image', upload.single('designImage'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Image file is required');
    }
    const analysisResults = await imageAnalysisService.analyzeImage(req.file.buffer);
    const generativeResults = await generativeModelService.generateDesigns(analysisResults);
    console.log('Image processed and designs generated successfully');
    res.json({ success: true, analysisResults, generativeResults });
  } catch (error) {
    console.error('Error processing image upload and generating designs:', error.message, error.stack);
    res.status(500).json({ success: false, message: 'Error processing image upload and generating designs', error: error.message });
  }
});

module.exports = router;