var mongoose = require('mongoose');

var schema   = new mongoose.Schema({
    number: Number,
    sex: String,
    waist: Number,
    seat: Number,
    outseam: Number,
    available: Boolean
});

module.exports = mongoose.model('Jumpsuit', schema);
