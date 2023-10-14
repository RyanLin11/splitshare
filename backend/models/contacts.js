const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const ContactSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    contactId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;