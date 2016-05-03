/**
 * Created by Kyle Walter on 2/29/2016.
 */

var express = require('express');
var router = express.Router();
var controller = require('../../controllers/user.js');
var nodemailer = require('nodemailer');

router.get('/',isAdmin,controller.getUsers);
router.post('/',isAdmin,controller.newUser);
router.get('/:id',controller.getUser);
router.post('/:id',controller.editUser);
router.get('/delete/:id',isAdmin,controller.deleteUser);

router.post('/confirm', function(req, res, next){
  var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'SalukiUniforms@gmail.com',
      pass: 'titanburg'
    }
  });

  var mailOptions = {
    from: /*firstName from session*/ /*lastName from session*/ <SalukiUniforms@gmail.com>,
    to: //user email that was approved
    subject: 'Band Uniform Account Confrimed',
    text: 'Your account on the SIU Band Uniform app has been approved and is now active!',
    html: '<p> Your account on the SIU Band Uniform app has has been approved and is now active!</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }
    else {
      console.log('Message sent <3' + info.response);
    }
  });
})

function isAdmin(req,res,next){
  if(req.user && req.user.local.admin){
    return next();
  }
  res.json({})
}

module.exports = router;
