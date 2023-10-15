const Contact = require('../models/contacts');
const Payable = require('../models/payables');

class ContactController {
    static async GetContacts(req, res, next) {
        let owedByContacts = await Payable.aggregate([
            {
              $match: {
                'eventId.owner': req.session.user,
              },
            },
            {
              $lookup: {
                from: 'items',
                localField: 'itemId',
                foreignField: '_id',
                as: 'item',
              },
            },
            {
              $unwind: '$item',
            },
            {
              $lookup: {
                from: 'users',
                localField: 'payeeId',
                foreignField: '_id',
                as: 'user',
              },
            },
            {
              $unwind: '$user',
            },
            {
              $group: {
                _id: '$user._id', // Group by user ID
                totalCost: {
                  $sum: {
                    $multiply: ['$fraction', '$item.cost'],
                  },
                },
              },
            },
            {
              $project: {
                _id: 1,
                name: '$contacts.alias',
                totalCost: 1,
              },
            },
        ]);
    
        let owingToContacts = await Payable.aggregate([
            {
              $match: {
                payeeId: req.session.user, // Assuming you have access to the current user's ID
              },
            },
            {
              $lookup: {
                from: 'items',
                localField: 'itemId',
                foreignField: '_id',
                as: 'item',
              },
            },
            {
              $unwind: '$item',
            },
            {
              $lookup: {
                from: 'events',
                localField: 'item.eventId',
                foreignField: '_id',
                as: 'event',
              },
            },
            {
              $unwind: '$event',
            },
            {
              $lookup: {
                from: 'users',
                localField: 'event.owner',
                foreignField: '_id',
                as: 'user',
              },
            },
            {
              $unwind: '$user',
            },
            {
              $group: {
                _id: '$user._id', // Group by user ID
                totalCost: {
                  $sum: {
                    $multiply: ['$fraction', '$item.cost'],
                  },
                },
              },
            },
            {
              $project: {
                _id: 1, // Include the user's ID in the result
                name: '$contacts.alias',
                totalCost: 1,
              },
            },
        ]);
        // merge contacts
        let contactsById = {};
        for (let { id, name, totalCost } in owedByContacts) {
            contactsById[id].name = name;
            contactsById[id].receivable = totalCost;
            contactsById[id].payable = 0;
        }
        for (let { id, name, totalCost } in owingToContacts) {
            if (!(id in contacts)) {
                contactsById[id].name = name;
                contactsById[id].receivable = 0;
            }
            contactsById[id].payable = totalCost;
        }
    
        let contacts = [];
        for (const [userId, info] of map) {
            contacts.push({ userId, ...info });
        }
        
        res.send(contacts);
    }

    static async CreateContact(req, res, next) {
        try {
            let contact = new Contact({ ...req.body, userId: req.session.user });
            await contact.save();
            res.send(contact);
        } catch (err) {
            next(err);
        }
    }

    // gets map of item names and amounts owed by personOwed to personOwing
    static async getListOwed(personOwing, personOwed) {
      // SELECT Items.name, SUM(Payables.fraction * Items.cost)
      // FROM Payables
      // WHERE Payables.payee = <personOwing>
      // INNER JOIN Items ON Payables.itemId = Items._id
      // INNER JOIN Events ON Items.eventId = Events._id
      // WHERE Events.owner = <personOwed>
      // GROUP BY Items._id
      return PayableModel.aggregate([
        {
          $match: {
            payeeId: personOwing,
          },
        },
        {
          $lookup: {
            from: 'items',
            localField: 'itemId',
            foreignField: '_id',
            as: 'item',
          },
        },
        {
          $unwind: '$item',
        },
        {
          $lookup: {
            from: 'events',
            localField: 'item.eventId',
            foreignField: '_id',
            as: 'event',
          },
        },
        {
          $unwind: '$event',
        },
        {
          $match: {
            'event.owner': personOwed,
          },
        },
        {
          $group: {
            _id: '$item._id', // Group by item's ID
            totalCost: {
              $sum: {
                $multiply: ['$fraction', '$item.cost'],
              },
            },
          },
        },
        {
          $project: {
            _id: 0, // Exclude _id from the result
            name: '$item.name', // Assuming the Item model has a 'name' field
            totalCost: 1,
          },
        },
      ]);
    }

    static async GetContact(req, res, next) {
        try {
            let contact = await Contact.findById(req.params.id);
            // get the stuff that this guy owes us
            let otherPersonOwes = await this.getListOwed(req.params.id, req.session.user);
            // get the stuff that we owe this guy
            let weOweToThisGuy = await this.getListOwed(req.session.user, req.params.id);
            let response = {
                _id: contact._id,
                name: contact.name,
                receivables: otherPersonOwes,
                payables: weOweToThisGuy
            };
            res.send(response);
        } catch (err) {
            next(err);
        }
    }

    static async EditContact(req, res, next) {
        let update = {};
        if ('alias' in req.body) {
            update.alias = req.body.alias;
        }
        let contact = await Contact.findByIdAndUpdate(req.params.id, update);
        res.send(contact);
    }

    static async DeleteContact(req, res, next) {
        await Contact.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    }
}

module.exports = ContactController;