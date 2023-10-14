const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const PayableSchema = new mongoose.Schema({
    payeeId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    itemId: {
        type: ObjectId,
        ref: 'Item',
        required: true
    },
    fraction: {
        type: Number,
        required: true
    }
});

const Payable = mongoose.model("Payable", PayableSchema);

module.exports = Payable;