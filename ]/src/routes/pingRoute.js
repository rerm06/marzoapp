const express = require('express');
const pingController = require('../controllers/pingController');
const router = express.Router();

router.get('/ping', (req, res) => {
  try {
    pingController.getPingResponse(req, res);
    console.log('Ping route was called successfully.');
  } catch (error) {
    console.error('Error occurred in ping route:', error.message, error.stack);
    res.status(500).json({status: 'error', message: 'Internal server error'});
  }
});

module.exports = router;