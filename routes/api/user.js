/**
 * Created by Kyle Walter on 2/29/2016.
 */

var express = require('express');
var router = express.Router();
var controller = require('../../controllers/user.js');

router.get('/',controller.getUsers);
router.post('/',controller.newUser);
router.get('/:id',controller.getUser);
router.post('/:id',controller.editUser);
router.get('/delete/:id',controller.deleteUser);

module.exports = router;
