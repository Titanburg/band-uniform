var mongoose = require('mongoose');

var schema   = new mongoose.Schema({
    number        : Number,
    sex           : String,
    chest         : Number,
    length        : Number,
    available     : Boolean
});

module.exports = mongoose.model('Jacket', schema);
