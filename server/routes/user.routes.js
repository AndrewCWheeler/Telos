const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.json(err => ({ message: 'error', results: err }));
  } else {
    next();
  }
};
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.json(err => ({ message: 'error', results: err }));
  } else {
    next();
  }
};

module.exports = app => {
  app.post('/api/register', redirectHome, UserController.register);
  app.post('/api/login', redirectHome, UserController.login);
  app.get('/api/users', authenticate, UserController.getAll);
  app.get('/api/users/one', authenticate, UserController.oneUser);
  app.get('/api/users/tasks', authenticate, UserController.getAllUserTasks);
  app.delete('/api/users/:id', authenticate, UserController.deleteUser);
  app.get(
    '/api/users/logout',
    authenticate,
    redirectLogin,
    UserController.logout
  );
};
