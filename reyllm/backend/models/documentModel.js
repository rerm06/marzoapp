const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  type: { type: String, required: true, enum: ['PDF', 'TXT', 'DOCX', 'etc'] },
  relatedWorkspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;