
module.exports = function(passport){
  var express = require('express');
  var router = express.Router();
  /* GET users listing. */
  router.post('/signup',passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/auth/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  router.get('/login',function(req,res,next){
    res.render('login',{title: 'Login',message: req.flash('loginMessage')});
  });
  router.post('/login',passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/auth/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  router.get('/logout',function(req,res,next){
    req.logout();
    res.redirect('/auth/login')
  })

  return router;
};
