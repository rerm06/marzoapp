const Quotation = require('../models/quotationModel');
const { generateExcel } = require('../utils/excelGenerator');

exports.exportQuotationToExcel = async (req, res) => {
    try {
        const { quotationId } = req.params;
        console.log(`Starting export of quotation with ID: ${quotationId}`);
        const quotation = await Quotation.findById(quotationId);
        if (!quotation) {
            console.log(`Quotation not found with ID: ${quotationId}`);
            return res.status(404).json({ message: 'Quotation not found' });
        }

        const excelBuffer = generateExcel(quotation);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=quotation-${quotationId}.xlsx`);
        res.send(excelBuffer);
        console.log(`Exported quotation with ID: ${quotationId} to Excel successfully.`);
    } catch (error) {
        console.error(`Error exporting quotation to Excel: ${error.message}`, error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};