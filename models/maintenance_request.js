var mongoose = require('mongoose');

var schema   = new mongoose.Schema({
    firstName         : String,
    lastName          : String,
    piece             : String,
    description       : String
});

module.exports = mongoose.model('maintenance', schema);
