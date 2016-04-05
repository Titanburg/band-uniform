var express = require('express');
var router = express.Router();

var user = require('./api/user.js');
var jacket = require('./api/jacket.js');
var jumpsuit = require('./api/jumpsuit.js');
//var hat = require('./api/hat');
var instrument = require('./api/instruments.js');
var request = require('./api/maintenance_request.js');
var urequest = require('./api/uniform_request.js');

router.use('/user',user);
router.use('/jacket',jacket);
router.use('/jumpsuit',jumpsuit);
//router.use('/hat',hat);
router.use('/instruments',instrument);
router.use('/maintenance_request',request);
router.use('/uniform_request',urequest);

module.exports = router;
