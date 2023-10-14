const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;