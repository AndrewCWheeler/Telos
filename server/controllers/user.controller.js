const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const myFirstSecret = process.env.FIRST_SECRET_KEY;

// const redirectLogin = (req, res, next) => {
//   if (!req.session.userId) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

module.exports = {
  getAll: (req, res) => {
    User.find({})
      .then(users => res.json({ message: 'success', results: users }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
  oneUser: (req, res) => {
    User.findOne({ _id: req.session.userId })
      .then(user => res.json({ message: 'success', results: user }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
  getAllUserTasks: async (req, res) => {
    await User.findOne({ _id: req.session.userId })
      .populate('tasks')
      .then(userTasks => res.json({ message: 'success', results: userTasks }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
  updateTasks: (req, res) => {
    User.tasks.bulkWrite(
      req.body.map((data)=>({
        updateOne: {
          filter: { _id: data._id },
          update: { $set: data }
        }
      }))
    ).then(taskArr => res.json({message: 'success', results: taskArr }))
    .catch(err => res.json({ message: 'error', results: err}))
  },
  getAllUserCategories: async (req, res) => {
    await User.findOne({ _id: req.session.userId })
      .populate('categories')
      .then(userCategories => res.json({ message: 'success', results: userCategories }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
  deleteUser: (req, res) => {
    User.findByIdAndRemove({ _id: req.params.id })
      .then(user => res.json({ message: 'success', results: user }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
  register: (req, res) => {
    User.create(req.body)
      .then(user => {
        const userToken = jwt.sign(
          {
            id: user._id,
          },
          myFirstSecret
        );
        req.session.userId = user.id;
        res
          .cookie('usertoken', userToken, {
            httpOnly: true,
          })
          .json({
            message: 'success',
            results: {
              user: user,
            },
          });
      })
      .catch(err => res.json({ message: err.toString(), results: err }));
  },
  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      // email not found in users collection
      return res.sendStatus(400);
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      // password wasn't a match!
      return res.sendStatus(400);
    }
    const userToken = jwt.sign(
      {
        id: user._id,
      },
      myFirstSecret
    );
    req.session.userId = user.id;
    res
      .cookie('usertoken', userToken, {
        httpOnly: true,
      })
      .json({
        message: 'success',
        results: {
          user,
        },
      });
  },
  logout: (req, res) => {
    res.clearCookie('usertoken');
    req.session.destroy(err => {
      if (err) {
        return res.json({ message: 'failed to logout' });
      }
      res.clearCookie('sid');
      res.sendStatus(200);
    });
  },
};
