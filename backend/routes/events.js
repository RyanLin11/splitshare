const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/auth');
const EventController = require('../controllers/EventController');

router.route('/')
.get(isAuthenticated, EventController.getEvents)
.post(isAuthenticated, EventController.createEvent);

router.route('/:id')
.get(isAuthenticated, EventController.getEvent)
.put(isAuthenticated, EventController.editEvent)
.delete(isAuthenticated, EventController.deleteEvent);

module.exports = router;