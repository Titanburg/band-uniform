
module.exports = function(app,passport){

  var auth = require('./auth')(passport);
  var api = require('./api');

  app.get('/',initIsLoggedIn, function(req,res,next){
    // res.redirect('/auth/login');

    res.render('index',{title:'Band Uniform Management Utility',user:{_id:req.user.local.id,name:req.user.local.firstName,email:req.user.local.email,admin:req.user.local.admin}});
  });

  app.use('/auth',auth);
  app.use('/api',isLoggedIn,api);

  app.get('/partial/:name', isLoggedIn,function(req,res,next){

    var jadeVariables = {
      title:'Band Uniform Management Utility',
      user: {
        _id:req.user.id,
        name:req.user.local.firstName + ' ' + req.user.local.lastName,
        email:req.user.local.email,
        admin:req.user.local.admin
      }
    }

    // Check which type of user [user, admin]
    if(req.user && req.user.local.admin){
      // admin
      switch(req.params.name){
        case 'users':
        case 'instruments':
        case 'maintenance_request':
        case 'uniform':
        case 'account':
          res.render('partials/admin/' + req.params.name,jadeVariables);
          break;
        default:
          res.render('partials/oops');
      }
    }else{
      // user
      switch(req.params.name){
        case 'maintenance_request':
        case 'account':
          res.render('partials/user/' + req.params.name,jadeVariables);
          break;
        default:
          res.render('partials/oops');
      }
    }
    // Catch the impossible scenario
    res.render('partials/oops');
  });

  app.get('/*',isLoggedIn,function(req,res,next){
    console.log(JSON.stringify(req.user.id));
    res.render('index',{title:'Band Uniform Management Utility',user:{_id:req.user.id,name:req.user.local.firstName,email:req.user.local.email,admin:req.user.local.admin}});
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    req.flash('authentication', "Authentication Required!!");
    res.render('login', {messages: req.flash('authentication')});
  }

  function initIsLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.render('login', {messages: req.flash('authentication')});
  }
};
