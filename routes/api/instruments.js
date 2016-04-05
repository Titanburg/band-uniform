var express = require('express');
var router = express.Router();
var controller = require('../../controllers/instruments.js');

router.get('/',controller.getInstruments);
router.post('/',controller.newInstrument);
router.get('/:id',controller.getInstrument);
router.post('/:id',controller.editInstrument);
router.get('/delete/:id',controller.deleteInstrument);

module.exports = router;
