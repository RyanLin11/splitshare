const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/auth');
const ContactController = require('../controllers/ContactController');

router.route('/')
.get(isAuthenticated, ContactController.GetContacts)
.post(isAuthenticated, ContactController.CreateContact);

router.route('/:id')
.get(isAuthenticated, ContactController.GetContact)
.put(isAuthenticated, ContactController.EditContact)
.delete(isAuthenticated, ContactController.DeleteContact);

module.exports = router;