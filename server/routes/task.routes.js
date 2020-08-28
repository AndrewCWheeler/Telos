const TaskController = require('../controllers/task.controller');
const { authenticate } = require('../config/jwt.config');
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.json(err => ({ message: 'error', results: err }));
  } else {
    next();
  }
};

module.exports = app => {
  app.get('/api', TaskController.index);
  app.get(
    '/api/tasks/user',
    authenticate,
    redirectLogin,
    TaskController.allUserTasks
  );
  app.get('/api/tasks/:id', authenticate, TaskController.oneTask);
  app.post('/api/tasks/:id', authenticate, TaskController.newTask);
  app.patch('/api/tasks/:id', authenticate, TaskController.editTask);
  app.delete('/api/tasks/:id', authenticate, TaskController.deleteTask);
};
