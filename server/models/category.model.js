const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  nameOne: {
    type: String,
    required: [true, 'This field is required.'],
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [20, 'That category name is too long!'],
  },
  nameTwo: {
    type: String,
    required: [true, 'This field is required.'],
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [20, 'That category name is too long!'],
  },
  nameThree: {
    type: String,
    required: [true, 'This field is required.'],
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [20, 'That category name is too long!'],
  },
  nameFour: {
    type: String,
    required: [true, 'This field is required.'],
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [20, 'That category name is too long!'],
  },
  nameFive: {
    type: String,
    required: [true, 'This field is required.'],
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [20, 'That category name is too long!'],
  },
  nameSix: {
    type: String,
    required: [true, 'This field is required.'],
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [20, 'That category name is too long!'],
  },
  nameSeven: {
    type: String,
    required: [true, 'This field is required.'],
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [20, 'That category name is too long!'],
  },
  nameEight: {
    type: String,
    required: [true, 'This field is required.'],
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [20, 'That category name is too long!'],
  },
});

module.exports.Category = mongoose.model('Category', CategorySchema);
