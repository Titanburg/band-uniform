var express = require('express');
var router = express.Router();
var controller = require('../../controllers/maintenance_request.js');

router.get('/',controller.getRequests);
router.post('/',controller.newRequest);
router.get('/:id',controller.getRequest);
router.post('/:id',controller.editRequest);
router.get('/delete/:id',controller.deleteRequest);

module.exports = router;
