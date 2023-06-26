const mongoose = require('mongoose');
const uniq = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({

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
        required: true
    },
    lists: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'List'
        }
    ]
});

userSchema.plugin(uniq);
mosdule.exports = mongoose.model('User', userSchema);