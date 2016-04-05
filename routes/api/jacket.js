var express = require('express');
var router = express.Router();
var controller = require('../../controllers/jacket.js');

router.get('/',controller.getJackets);
router.post('/',controller.newJacket);
router.get('/:id',controller.getJacket);
router.post('/:id',controller.editJacket);
router.get('/delete/:id',controller.deleteJacket);

module.exports = router;
