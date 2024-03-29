const express = require('express');
const router = express.Router();
const QuotationController = require('../controllers/quotationController');

// Route for exporting quotation to Excel
router.get('/export/:quotationId', QuotationController.exportQuotationToExcel);

module.exports = router;