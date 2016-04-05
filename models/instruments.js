var mongoose = require('mongoose');

// Schema for Instruments
var schema   = new mongoose.Schema({
	name          : String,
	group         : String,
	jacket        : Number,
	jumpsuit      : Number,
	hat           : Number,
    gloves        : Number
});

module.exports = mongoose.model('Instruments', schema);