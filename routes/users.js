// create the router
const router = require('express').Router();

const {
  getUser, getUsers, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

// route definitions
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
