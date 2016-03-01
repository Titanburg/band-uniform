var express = require('express');
var router = express.Router();

var user = require('./api/user.js');
//var jacket = require('./api/jacket.js');
//var jumpsuit = require('./api/jumpsuit.js');
//var hat = require('./api/hat');

router.use('/user',user);
//router.use('/jacket',jacket);
//router.use('/jumpsuit',jumpsuit);
//router.use('/hat',hat);

module.exports = router;
