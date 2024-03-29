const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sharedDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  mode: { type: String, required: true, enum: ['conversation', 'query'] }
});

workspaceSchema.pre('save', function(next) {
  if (!this.members.length) {
    const err = new Error('Workspace must have at least one member');
    next(err);
  } else {
    next();
  }
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;