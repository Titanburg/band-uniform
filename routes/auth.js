
module.exports = function(passport){
  var express = require('express');
  var router = express.Router();
  /* GET users listing. */
  router.post('/signup',passport.authenticate('local-signup', {
    successRedirect: '/users', // redirect to the secure profile section
    failureRedirect: '/auth/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  router.get('/login',function(req,res,next){
    console.log('auth check');
    res.render('login',{title: 'Login', messages: req.flash('loginMessage')});
  });

  // router.post('/login', passport.authenticate('local-login', {
  //   successRedirect: '/users', // redirect to the secure profile section
  //   failureRedirect: '/auth/login', // redirect back to the signup page if there is an error
  //   failureFlash: true // allow flash messages
  // }));

  router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    console.log(req.body);
    if (err) { return next(err); }
    if (!user) {
      if(req.body.type === 'android')
        return res.json({
          status:'FAILURE',
          message:req.flash('loginMessage')
        });
      return res.redirect('/auth/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      if(req.body.type === 'android')
        return res.json({
          status:'SUCCESS',
          message:''
        });
      return res.redirect('/users');
    });
  })(req, res, next);
});

  router.get('/logout',function(req,res,next){
    req.logout();
    res.redirect('/auth/login');
  })

  return router;
};
