// app.js — input file

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
});

// to serve static files that are in the public directory - ie. http://localhost:3000/kitten.jpg
// app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// continue on to use router that does not match public folder thru '/'

app.use((req, res, next) => {
  req.user = {
    _id: '62d55ac01704489929717dcf', // paste the _id of the test user created in the previous step
  };

  next();
});
app.use('/', usersRouter);
app.use('/', cardRouter);

// this matches all routes and all methods i.e a centralized error handler
// app.use((res) => {
//   res.status(404).send({
//     error: 'Requested resource not found',
//   });
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
