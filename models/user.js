const mongoose = require('mongoose');
const uniq = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'I am new here!',
        required: false
    },
    lists: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'List'
        }
    ],
});

userSchema.plugin(uniq);
module.exports = mongoose.model('User', userSchema);