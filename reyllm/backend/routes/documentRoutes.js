const express = require('express');
const multer = require('multer');
const { uploadDocument, downloadDocument, deleteDocument } = require('../controllers/documentController');
const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // The destination directory for uploaded files

router.post('/upload', upload.single('document'), (req, res) => {
    uploadDocument(req, res).catch(err => {
        console.error("Error uploading document:", err);
        res.status(500).json({ message: "Failed to upload document", error: err.message });
    });
});

router.get('/download/:docId', (req, res) => {
    downloadDocument(req, res).catch(err => {
        console.error("Error downloading document:", err);
        res.status(500).json({ message: "Failed to download document", error: err.message });
    });
});

router.delete('/delete/:docId', (req, res) => {
    deleteDocument(req, res).catch(err => {
        console.error("Error deleting document:", err);
        res.status(500).json({ message: "Failed to delete document", error: err.message });
    });
});

module.exports = router;