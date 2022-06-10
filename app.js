const express = require('express');
const helmet = require('helmet')

const usersRouter = require('./routes/users');
const cardRouter = require('./routes/card');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet())

// to serve static files that are in the public directory ie. http://localhost:3000/kitten.jpg
// app.use(express.static(path.join(__dirname, 'public')));

// continue on to use router that does not match public folder thru '/'
app.use('/', usersRouter);
app.use('/', cardRouter);

// this matches all routes and all methods i.e a centralized error handler
app.use((res) => {
  res.status(404).send({
    error: 'Requested resource not found',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
