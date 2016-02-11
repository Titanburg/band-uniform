var mongoose = require('mongoose');

var schema   = new mongoose.Schema({
    number        : Number,
    size          : String
});

module.exports = mongoose.model('Hat', schema);
