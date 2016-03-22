
module.exports = function(app,passport){

  var auth = require('./auth')(passport);
  var api = require('./api');

  app.use('/auth',auth);
  app.use('/api',api);

  app.get('/partial/:name', isLoggedIn,function(req,res,next){
    res.render('partials/' + req.params.name);
  });

  app.get('/*',isLoggedIn,function(req,res,next){
    res.render('index',{title:'Band Uniform Management Utility',user:{name:req.user.local.firstName}});
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    console.log('Not Logged In');
    req.flash('authentication', "Authentication Required");
    res.render('login', {messages: req.flash('authentication')});
  }

};