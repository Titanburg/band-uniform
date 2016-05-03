var mongoose = require('mongoose');
var configDB = require('../database/mongoose.js');
/* Connect to the DB */
mongoose.connect(configDB.url,function(){
    /* Drop the DB */
    mongoose.connection.db.dropDatabase();
});