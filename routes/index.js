
module.exports = function(app,passport){

  var auth = require('./auth')(passport);
  var api = require('./api');

  app.use('/auth',auth);
  app.use('/api',isLoggedIn,api);

  app.get('/partial/:name', isLoggedIn,function(req,res,next){
    // Check which type of user [user, admin]
    if(req.user && req.user.local.admin){
      // admin
      switch(req.params.name){
        case 'users':
        case 'maintenance_request':
          res.render('partials/admin/' + req.params.name);
          break;
        default:
          res.render('partials/oops');
      }
    }else{
      // user
      switch(req.params.name){
        case 'maintenance_request':
          res.render('partials/admin/' + req.params.name);
          break;
        default:
          res.render('partials/oops');
      }
    }
    // Catch the impossible scenario
    res.render('partials/oops');
  });

  app.get('/*',isLoggedIn,function(req,res,next){
    res.render('index',{title:'Band Uniform Management Utility',user:{email:req.user.local.email,admin:req.user.local.admin}});
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/auth/login');
  }

};
