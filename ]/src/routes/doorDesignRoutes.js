const express = require('express');
const router = express.Router();
const doorDesignController = require('../controllers/doorDesignController');

router.get('/:designId', doorDesignController.getDoorDesign);

module.exports = router;