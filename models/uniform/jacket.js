var mongoose = require('mongoose');

var schema   = new mongoose.Schema({
    number        : Number,
    sex           : String,
    chest         : Number,
    armlength     : String,
    available     : Boolean
});

module.exports = mongoose.model('Jacket', schema);
