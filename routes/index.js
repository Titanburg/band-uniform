
module.exports = function(app,passport){

  var user = require('./user')(passport);
  // var api = require('./api');

  app.use('/user',user);
  // app.use('/api',api);

  app.get('/dashboard', isLoggedIn,function(req,res,next){
    res.render('index',{title: 'Titanburg Band Uniform'});
  });

  app.get('/*',function(req,res,next){
    res.redirect('/dashboard');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/user/login');
  }

};
