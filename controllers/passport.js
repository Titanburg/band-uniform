
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
                      return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                  } else {
                      var newUser            = new User();
                      newUser.local.email    = username;
                      newUser.local.password    = newUser.generateHash(password);
                      newUser.local.admin       = false;
                      newUser.save(function(err) {
                          if (err)
                              throw err;
                          return done(null, newUser);
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
                return done(null, stripUser(user));
            });

        }));

};
