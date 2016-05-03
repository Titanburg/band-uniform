var mongoose = require('mongoose');

var schema   = new mongoose.Schema({
    userNumber        : String,
    jacketNumber      : Number,
    jumpsuitNumber    : Number,
    //hatNumber         : Number,
    //gloves            : Boolean,
  //  shoes             : Boolean,
  //  tshirt            : Boolean,
    chest             : Number,
    armlength         : Number,
    waist             : Number,
    seat              : Number,
    outseam           : Number,
    complete          : Boolean
});

module.exports = mongoose.model('Urequest', schema);
