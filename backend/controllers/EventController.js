const Event = require('../models/events');
const Item = require('../models/items');

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
            const additionalInfo = await Item.aggregate([
                {
                    $lookup: {
                        from: 'payables',
                        localField: '_id',
                        foreignField: 'itemId',
                        as: 'payables',
                    },
                },
                {
                    $unwind: '$payables',
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'payables.payeeId',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $unwind: '$user',
                },
                {
                    $project: {
                        _id: 1, // Include item's ID in the result
                        name: 1, // Include item's name in the result
                        cost: 1, // Include item's cost in the result
                        email: '$user.email',
                    },
                },
            ]);
            console.log(additionalInfo);
            let itemMap = {};
            let items = additionalInfo.forEach(({ _id, name, cost, email }) => {
                if (!(_id in itemMap)) {
                    itemMap[_id] = {
                        name,
                        cost,
                        payees: []
                    }
                }
                itemMap[_id].payees.push(email);
            });
            let response = {
                ...event,
                items
            };
            res.send(response);
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