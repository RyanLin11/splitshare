const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    eventId: {
        type: ObjectId,
        ref: 'Event',
        required: true
    },
    cost: {
        type: Number,
        required: true,
    }
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;