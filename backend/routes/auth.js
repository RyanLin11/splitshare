const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { isAuthenticated } = require('../utils/auth');

router.post('/login', UserController.login);
router.get('/logout', isAuthenticated, UserController.logout);

module.exports = router;