const CategoryController = require('../controllers/category.controller');
const { Category } = require('../models/category.model');

module.exports = app => {
  app.get('/api/categories', CategoryController.allCategories);
  app.get('/api/categories/:id', CategoryController.oneCategory);
  app.post('/api/categories', CategoryController.newCategory);
  app.patch('/api/categories/:id', CategoryController.editCategory);
  app.delete('/api/categories/:id', CategoryController.deleteCategory);
};
