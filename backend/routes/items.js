const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
const { isAuthenticated } = require('../utils/auth');

router.route('/')
.get(isAuthenticated, ItemController.getItems)
.post(isAuthenticated, ItemController.createItem);

router.route('/:id')
.get(isAuthenticated, ItemController.getItem)
.put(isAuthenticated, ItemController.editItem)
.delete(isAuthenticated, ItemController.deleteItem);

module.exports = router;