/**
 * Created by Kyle Walter on 2/29/2016.
 */

var express = require('express');
var router = express.Router();
var controller = require('../../controllers/user.js');

router.get('/',isAdmin,controller.getUsers);
router.post('/',isAdmin,controller.newUser);
router.get('/:id',controller.getUser);
router.post('/:id',controller.editUser);
router.get('/delete/:id',isAdmin,controller.deleteUser);

function isAdmin(req,res,next){
  if(req.user && req.user.local.admin){
    return next();
  }
  res.json({})
}

module.exports = router;
