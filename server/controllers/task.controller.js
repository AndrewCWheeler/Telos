const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

module.exports = {
  index: (req, res) => {
    res.json({ message: 'Working' });
  },

  // Read methods --> app.get
  allUserTasks: (req, res) => {
    Task.find({ owner: req.session.userId })
      .populate('tasks')
      .then(tasks => res.json({ message: 'success', results: tasks }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
  oneTask: (req, res) => {
    Task.findOne({ _id: req.params.id })
      .then(task => res.json({ message: 'success', results: task }))
      .catch(err => res.json({ message: 'error', results: err }));
  },

  //Create methods --> app.post
  newTask: (req, res) => {
    Task.create(req.body)
      .then(task => {
        return User.findByIdAndUpdate(
          { _id: req.params.id },
          { $push: { tasks: task._id } },
          { new: true }
        );
      })
      .then(user => res.json({ message: 'success', results: user }))
      .catch(err => res.json({ message: 'error', results: err }));
  },

  //Update methods --> app.put or app.patch
  editTask: (req, res) => {
    Task.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
      new: true,
    })
      .then(task => res.json({ message: 'success', results: task }))
      .catch(err => res.json({ message: 'error', results: err }));
  },

  //Delete methods --> app.delete
  deleteTask: (req, res) => {
    Task.findByIdAndDelete({ _id: req.params.id })
      .then(task => res.json({ message: 'success', results: task }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
};
