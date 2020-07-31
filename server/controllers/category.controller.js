const { Category } = require('../models/category.model');

module.exports = {
  allCategories: (req, res) => {
    Category.find({})
      .then(categories => res.json({ message: 'success', results: categories }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
  oneCategory: (req, res) => {
    Category.findOne({ _id: req.params.id })
      .then(category => res.json({ message: 'success', results: category }))
      .catch(err => res.json({ message: 'error', results: err }));
  },

  //Create methods --> app.post
  newCategory: (req, res) => {
    Category.create(req.body)
      .then(category => res.json({ message: 'success', results: category }))
      .catch(err => res.json({ message: 'error', results: err }));
  },

  //Update methods --> app.put or app.patch
  editCategory: (req, res) => {
    Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
      new: true,
    })
      .then(category => res.json({ message: 'success', results: category }))
      .catch(err => res.json({ message: 'error', results: err }));
  },

  //Delete methods --> app.delete
  deleteCategory: (req, res) => {
    Category.findOneAndDelete({ _id: req.params.id })
      .then(category => res.json({ message: 'success', results: category }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
};
