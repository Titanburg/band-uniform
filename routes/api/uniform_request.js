var express = require('express');
var router = express.Router();
var controller = require('../../controllers/uniform_request.js');

router.get('/',controller.getUrequests);
router.post('/',controller.newUrequest);
router.get('/:id',controller.getUrequest);
router.post('/:id',controller.editUrequest);
router.get('/delete/:id',controller.deleteUrequest);

module.exports = router;
