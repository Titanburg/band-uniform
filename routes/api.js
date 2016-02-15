var express = require('express');
var router = express.Router();

var jacket = require('./api/web/jacket.js');
var jumpsuit = require('./api/web/jumpsuit.js');
var hat = require('./api/web/hat');


router.use('/web/jacket',jacket);
router.use('/web/jumpsuit',jumpsuit);
router.use('/web/hat',hat);

module.exports = router;
