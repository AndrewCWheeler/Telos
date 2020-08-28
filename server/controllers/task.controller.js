const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

module.exports = {
  index: (req, res) => {
    res.json({ message: 'Working' });
  },

  // Read methods --> app.get
  allTasks: async (req, res) => {
    const user = await User.findOne({ _id: req.session.userId });
    Task.find({})
      .then(tasks =>
        res.json({ message: 'success', results: tasks, sessionUser: user })
      )
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
      .then(task => res.json({ message: 'success', results: task }))
      .catch(err => res.json({ message: 'error', results: err }));
  },

  //Update methods --> app.put or app.patch
  editTask: (req, res) => {
    Task.findBIAndUpdate({ _id: req.params.id }, req.body, {
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
