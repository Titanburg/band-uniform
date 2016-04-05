var mongoose = require('mongoose');

// Schema for Sousaphones
var schema   = new mongoose.Schema({
	name          : String,
	jacket        : Boolean,
	jumpsuit      : Boolean,
	hat           : Boolean,
    gloves        : Boolean
});

module.exports = mongoose.model('Sousaphones', schema);