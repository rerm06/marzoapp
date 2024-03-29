const XLSX = require('xlsx');
const logger = require('../config/logger'); // Ensure you have a logger configured

exports.generateExcel = (quotation) => {
    try {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([quotation.toObject()]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Quotation");

        logger.info("Excel file generated successfully.");

        return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    } catch (error) {
        logger.error("Error generating Excel file: ", error.message);
        throw new Error("Failed to generate Excel file.");
    }
};