const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUserByID = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id, // временное решение авторизации (req.user._id)
    { name, about },
    {new: true, runValidators: true, upsert: false}
    )
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.updateAvatar = (req, res) => {
  const { avatar }= req.body;
  User.findByIdAndUpdate(
    req.user._id, // временное решение авторизации (req.user._id)
    { avatar } ,
    {new: true, runValidators: true, upsert: false}
    )
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
}