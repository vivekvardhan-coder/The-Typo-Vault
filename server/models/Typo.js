const mongoose = require('mongoose');

const typoSchema = new mongoose.Schema({
  wrongWord: {
    type: String,
    required: true
  },
  correctWord: {
    type: String,
    required: true
  },
  person: {
    type: String,
    required: true
  },
  context: {
    type: String,
    default: ''
  },
  addedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Typo', typoSchema);