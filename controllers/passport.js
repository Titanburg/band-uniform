
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');

function stripUser(user){
  var newUser ={};
  newUser.local = user.local.toObject();
  delete newUser.local.password;
  newUser.id = user.id;
  console.log(JSON.stringify(newUser));
  return user;
}

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
      User.findById(id, function (err, user) {
          done(err, user);
      });
  });

  // Signup
  passport.use('local-signup', new LocalStrategy({
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true
      },
      function(req, username, password, done) {
          process.nextTick(function() {
              User.findOne({ 'local.email' :  username }, function(err, user) {
                  if (err) return done(err);
                  if (user) {
                      return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                  } else {
                      var newUser            = new User();
                      newUser.local.firstName = req.body.firstName;
                      newUser.local.lastName = req.body.lastName;
                      newUser.local.email    = username;
                      newUser.local.password    = newUser.generateHash(password);
                      newUser.local.admin       = false;
                      newUser.local.state      = 0;
                      newUser.save(function(err) {
                          if (err)
                              throw err;
                          return done(null, false, req.flash('loginMessage', 'Account request sent. Waiting on admin to accept account request'));
                      });
                  }
              });
          });
      }));

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        
        function(req, username, password, done) { // callback with email and password from our form
            User.findOne({ 'local.email' : username }, function(err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                if (user.local.state == 0)
                    return done(null,false,req.flash('loginMessage','Admin has not enabled your account yet.'));
                if (user.local.state == 2)
                    return done(null,false,req.flash('loginMessage','Account disabled'));
                return done(null, stripUser(user));
            });

        }));

};
