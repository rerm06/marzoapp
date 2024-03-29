exports.getPingResponse = (req, res) => {
  try {
    console.log('Received request for /ping');
    res.json({status: 'success', message: 'pong'});
  } catch (error) {
    console.error('Error handling /ping request:', error.message, error.stack);
    res.status(500).json({status: 'error', message: 'Internal server error'});
  }
};