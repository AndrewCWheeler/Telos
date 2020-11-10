const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'This field is required.'],
      minlength: [2, 'Category name must be at least 2 characters long!'],
      maxlength: [20, 'That category name is too long! Keep it short and sweet.'],
    },
    color: {
      type: String,
      default: 'theme.palette.primary.main',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports.Category = mongoose.model('Category', CategorySchema);
