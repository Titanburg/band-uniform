
module.exports = function(passport){
  var express = require('express');
  var router = express.Router();
  /* GET users listing. */
  router.get('/signup',function(req,res,next){
    res.render('signup',{title: 'Signup',message: req.flash('signupMessage')});
  });
  router.post('/signup',passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  router.get('/login',isLoggedOut,function(req,res,next){
    res.render('login',{title: 'Login',message: req.flash('loginMessage')});
  });
  router.post('/login',isLoggedOut,passport.authenticate('local-login', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/user/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  router.get('/logout',function(req,res,next){
    req.logout();
    res.redirect('/user/login');
  });

  function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated())
      return next();
    res.redirect('/dashboard');
  }

  return router;
};
