const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Add something first!'],
    },
    category: {
      type: String,
    },
    chunked: {
      type: Boolean,
      default: false,
    },
    scheduled: {
      type: Boolean,
      default: false,
    },
    scheduledAt: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    labelIdentity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true }
);

module.exports.Task = mongoose.model('Task', TaskSchema);
