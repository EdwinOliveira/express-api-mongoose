const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    initialDate: String,
    finalDate: String
});

module.exports = mongoose.model('Task', eventSchema);