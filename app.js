///////////////////////////////////////////////////////////////////
// Initialize Modules                                            //
///////////////////////////////////////////////////////////////////
  // Framework
  var express = require('express');
  var path = require('path');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  // Style and Icon
  //var favicon = require('serve-favicon');
  var lessMiddleware = require('less-middleware');

  // Database Setup
  var mongoose = require('mongoose');
  var configDB = require('./database/mongoose.js');

  // Authentication
  var passport = require('passport');
  var session = require('express-session');
  var flash = require('connect-flash');

  // Routes
  // var routes = require('./routes/index');
  // var users = require('./routes/users');

  // Initialize App
  var app = express();
  var sessionStore = new session.MemoryStore;

///////////////////////////////////////////////////////////////////
// Database Setup                                                //
///////////////////////////////////////////////////////////////////

  // Start Mongoose
  mongoose.connect(configDB.url,function(err){
    if(err){
      console.log(err);
    }else{
      console.log('Mongoose:      Connected to banduniform database');

      // Seed mongoose
      require('./database/seeds/banduniforms_1.0.js');
      require('./database/seeds/users_1.0.js');
    }
  });


///////////////////////////////////////////////////////////////////
//  Add modules to Express                                       //
///////////////////////////////////////////////////////////////////

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // Icon and style setup
  // app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(lessMiddleware(__dirname + '/public'));

  // Express utilities
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Passport setup
  // TODO: Delete next line after code review
  // app.use(session({secret:'thisisasuperdupersecret',cookie:{_expires:60000}}));
  app.use(session({
    secret: 'thisisasuperdupersecret',
    cookie: { maxAge: 60000 },
    name: 'band-uniform',
    store: sessionStore, // connect-mongo session store TODO: Make this applicable to Postgres?
    proxy: true,
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  require('./controllers/passport.js')(passport);

  app.use('/bower_components',express.static(path.join(__dirname,'/bower_components')));
  app.use('/fonts',express.static(path.join(__dirname,'/bower_components/bootstrap/fonts')));
  app.use(express.static(path.join(__dirname, 'public')));

///////////////////////////////////////////////////////////////////
//  Add Routes                                                   //
///////////////////////////////////////////////////////////////////
  //require('./routes/index')(app,passport);

  //Routes
  require('./routes/index.js')(app,passport);

///////////////////////////////////////////////////////////////////
//  Error Handlers                                               //
///////////////////////////////////////////////////////////////////

  // // Middleware for connect-flash messages
  // app.use(function(req, res, next){
  //   res.locals.messages = req.flash();
  //   next();
  // });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });



// Confirm application started
console.log('Band-Uniform:  Application Started ...');
console.log('---------------------------------------------------------------------------------------------------');
module.exports = app;
