
module.exports = function(passport){
  var express = require('express');
  var router = express.Router();
  /* GET users listing. */
  router.get('/signup',passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  router.get('/login',function(req,res,next){
    res.render('login');
  });
  router.post('/login',passport.authenticate('local-login', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/user/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  return router;
};
