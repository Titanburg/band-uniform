var express = require('express');
var router = express.Router();
var controller = require('../../controllers/jumpsuit.js');

router.get('/',controller.getJumpsuits);
router.post('/',controller.newJumpsuit);
router.get('/:id',controller.getJumpsuit);
router.post('/:id',controller.editJumpsuit);
router.get('/delete/:id',controller.deleteJumpsuit);

module.exports = router;
