const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch (err) {
    res.status(400).json({
      error: err
    });
  }
};

userCtrl.createUser = async (req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });
  await newUser.save();
  res.send({ message: 'User saved' });
};

userCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

userCtrl.updateUser = async (req, res) => {
  // const { } = req.body;
  await Note.findOneAndUpdate({ _id: req.params.id }, {
    username
  });
  res.json({ message: 'User updated' });
};

userCtrl.deleteUser = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  await User.findOneAndDelete({ _id: req.params.id });
  res.json('User deleted');
}

module.exports = userCtrl;