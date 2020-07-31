const TaskController = require('../controllers/task.controller');
const { Task } = require('../models/task.model');

module.exports = app => {
  app.get('/api', TaskController.index);
  app.get('/api/tasks', TaskController.allTasks);
  app.get('/api/tasks/:id', TaskController.oneTask);
  app.post('/api/tasks', TaskController.newTask);
  app.patch('/api/tasks/:id', TaskController.editTask);
  app.delete('/api/tasks/:id', TaskController.deleteTask);
};
