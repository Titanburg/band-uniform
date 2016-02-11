var mongoose = require('mongoose');

var schema   = new mongoose.Schema({
    userNumber        : Number,
    jacketNumber      : Number,
    jumpsuitNumber    : Number,
    hatNumber         : Number,
});

module.exports = mongoose.model('Request', schema);
