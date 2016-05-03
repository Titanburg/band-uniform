var mongoose = require('mongoose');

// Schema for Instruments
var schema   = new mongoose.Schema({
	name          : String,
	group         : String,
	jacket        : Boolean,
	jumpsuit      : Boolean,
	hat           : Boolean,
    gloves        : Boolean
});

module.exports = mongoose.model('Instruments', schema);