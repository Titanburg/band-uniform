var mongoose = require('mongoose');

var schema   = new mongoose.Schema({
    userNumber        : Number,
    jacketNumber      : Number,
    jumpsuitNumber    : Number,
    hatNumber         : Number,
    gloves            : Boolean,
    shoes             : Boolean,
    tshirt            : Boolean
});

module.exports = mongoose.model('Request', schema);
