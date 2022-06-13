// create the router
const router = require('express').Router();

// use the fs module to read data from this file when GET requests are made to the /card endpoint.
const fsPromises = require('fs').promises;

// create users path for reading
const path = require('path');

const CARDS_PATH = path.join(__dirname, '../data/cards.json');

router.get('/cards', (req, res) => {
  fsPromises
    .readFile(CARDS_PATH, { encoding: 'utf8' })
    .then((data) => {
      const cards = JSON.parse(data);
      res.send(cards);
    })
    .catch(() => res.status(500).send({ message: 'An error has occured' }));
});

module.exports = router;
