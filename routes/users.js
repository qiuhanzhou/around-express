// create the router
const router = require('express').Router();

// use the fs module to read data from this file when GET requests are made to the /users endpoint.
const fsPromises = require('fs').promises;

// create users path for reading
const path = require('path');

const USERS_PATH = path.join(__dirname, '../data/users.json');

function readUsersFilePromise() {
  return fsPromises.readFile(USERS_PATH, { encoding: 'utf8' });
}

function respondServerError(res) {
  res.status(500).send({ message: 'An error has occured' });
}

function findUserById(users, id) {
  const parsedUsersData = JSON.parse(users);
  return parsedUsersData.find((user) => user._id === id);
}

// create users router to respond with all users data
const sendUsers = (req, res) => {
  // fsPromises
  //   .readFile(USERS_PATH, { encoding: 'utf8' })
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch(() => res.status(500).send({ message: 'An error has occured' }));

  readUsersFilePromise()
    .then((data) => {
      const users = JSON.parse(data);
      res.send(users);
    })
    .catch(() => respondServerError(res));
};

router.get('/users', sendUsers);

// create dynamic user id router to respond matching user data

const doesUserExist = (req, res, next) => {
  readUsersFilePromise()
    .then((users) => {
      const user = findUserById(users, req.params.id);
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
        return;
      }
      next();
    })
    // .catch(() => res.status(500).send({ message: 'An error has occured' }));
    .catch(() => respondServerError(res));
};

const sendUser = (req, res) => {
  readUsersFilePromise()
    .then((users) => {
      const user = findUserById(users, req.params.id);
      res.send({ data: user });
    })
    .catch(() => respondServerError(res));
};

router.get('/users/:id', doesUserExist, sendUser);

module.exports = router;
