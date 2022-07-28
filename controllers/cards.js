const Card = require('../models/card');

// the getCards request handler
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

// the createCard request handler
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

// the deleteCard request handler
module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = 404;
      // Remember to throw an error so .catch handles it instead of pass null into .then
      throw error;
    })
    .then((card) => Card.deleteOne(card))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card id' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Error' });
      }
    });
};

const updateLikes = (req, res, method) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { [method]: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  ).orFail(() => {
    const error = new Error('No card found with that id');
    error.statusCode = 404;
    throw error; // Remember to throw an error so .catch handles it instead of pass null into .then
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card id' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Error' });
      }
    });
};

module.exports.likeCard = (req, res) => updateLikes(req, res, '$addToSet');

module.exports.dislikeCard = (req, res) => updateLikes(req, res, '$pull');
