const Item = require('../models/items');

class EventController {
    static async getItems(req, res, next) {
        try {
            let query = {};
            if ('eventId' in req.query) {
                query.eventId = req.query.eventId;
            }
            let items = await Item.find(query);
            res.send(items);
        } catch (err) {
            next(err);
        }
    }
    static async createItem(req, res, next) {
        try {
            let item = new Item(req.body);
            await item.save();
            res.send(item);
        } catch (err) {
            next(err);
        }
    }
    static async getItem(req, res, next) {
        try {
            let item = await Item.findById(req.params.id);
            res.send(item);
        } catch (err) {
            next(err);
        }
    }
    static async editItem(req, res, next) {
        try {
            let update = {};
            if ('name' in req.body) {
                update.name = req.body.name;
            }
            let item = await Item.findByIdAndUpdate(req.params.id, req.params.update);
            res.send(item);
        } catch (err) {
            next(err);
        }
    }
    static async deleteItem(req, res, next) {
        try {
            await Item.findByIdAndDelete(req.params.id);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = EventController;