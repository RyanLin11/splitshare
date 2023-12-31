const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { isAuthenticated } = require('../utils/auth');

router.route('/')
.get(isAuthenticated, UserController.getUsers)
.post(UserController.createUser);

router.route('/:id')
.get(isAuthenticated, UserController.getUser);

module.exports = router;