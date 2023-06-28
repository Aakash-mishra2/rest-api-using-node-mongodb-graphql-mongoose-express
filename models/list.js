const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    items: [
        {
            type: String,
            default: []
        }],
    listGeneratedAt: Date,
    customer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});
//fill in listGenerateAt by js date() construtor inside controllers. 
//List.listGeneratedAt instanceof Date;
module.exports = mongoose.model('List', listSchema);

