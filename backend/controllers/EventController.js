const Event = require('../models/events');

class EventController {
    static async getEvents(req, res, next) {
        try {
            let query = {};
            if ('owner' in req.query) {
                query.owner = req.query.owner;
            }
            let events = await Event.find(query);
            res.send(events);
        } catch (err) {
            next(err);
        }
        
    }
    static async createEvent(req, res, next) {
        try {
            let event = new Event({ ...req.body, owner: req.session.user });
            await event.save();
            res.send(event);
        } catch (err) {
            next(err);
        }
        
    }
    static async getEvent(req, res, next) {
        try {
            let event = await Event.findById(req.params.id);
            res.send(event);
        } catch (err) {
            next(err);
        }
    }
    static async editEvent(req, res, next) {
        try {
            let update = {};
            if ('name' in req.body) {
                update.name = req.body.name;
            }
            let updatedEvent = await Event.findByIdAndUpdate(req.params.id, update);
            res.send(updatedEvent);
        } catch (err) {
            next(err);
        }
    }
    static async deleteEvent(req, res, next) {
        try {
            await Event.findByIdAndDelete(req.params.id);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = EventController;