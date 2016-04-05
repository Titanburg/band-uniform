var mongoose = require('mongoose');

// Schema for Mellophones
var schema   = new mongoose.Schema({
	name          : String,
	jacket        : Boolean,
	jumpsuit      : Boolean,
	hat           : Boolean,
    gloves        : Boolean
});

module.exports = mongoose.model('Mellophones', schema);