const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const listSchema = new Schema({
    items: [
        {
            type: Array,
            default: []
        }],
    listGeneratedAt: Date,
    customer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('List', listSchema);

