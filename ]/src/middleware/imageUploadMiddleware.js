const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
fs.existsSync(uploadsDir) || fs.mkdirSync(uploadsDir);

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir); // The directory where uploaded images should be saved
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Set file size limit to 10MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array('designImages', 5); // Allows up to 5 images to be uploaded.

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error('Multer error uploading image:', err);
      res.status(500).json({ success: false, message: 'Multer error uploading image', error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error('Error uploading image:', err);
      res.status(500).json({ success: false, message: 'Error uploading image', error: err.message });
    } else {
      // Check if files were uploaded
      if (req.files.length === 0) {
        console.log('No files selected');
        res.status(400).json({ success: false, message: 'No files selected' });
      } else {
        console.log('Files uploaded successfully');
        next(); // Proceed to the next middleware
      }
    }
  });
};
