const mongoose = require('mongoose');
// const validator = require('express-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled in'],
    minlength: [2, 'The minimum length of the "name" filed is 2'],
    maxlength: [30, 'The maximum length of the "name" filed is 30'],
  },
  about: {
    type: String,
    required: [true, 'The "about" field must be filled in'],
    minlength: [2, 'The minimum length of the "name" filed is 2'],
    maxlength: [30, 'The maximum length of the "name" filed is 30'],
  },
  avatar: {
    type: String,
    required: [true, 'The "avatar" field must be filled in'],
    validate: {
      validator: (v) => /https?:\/\/(www)?.+/g.test(v),
      message: 'invalid url',
    },
  },
});

// create the model which allows us to interact with our collection of documents and export it
module.exports = mongoose.model('user', userSchema);
