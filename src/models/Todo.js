const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const todoSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4()
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  completed: {
    type: Boolean,
    default: false
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

todoSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Todo', todoSchema);