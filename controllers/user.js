/**
 * Created by Kyle Walter on 2/29/2016.
 */
var User = require('../models/user.js');

module.exports = {

    // Get all users form database
    getUsers : function(req,res){
        User.find({},function(err,users){
            if(err) return;
            users.forEach(function(user){
                user.local.password = '';
            });
            console.log(users);
            res.json(users);
        });
    },

    // Create new user in database
    newUser : function(req,res){
        User.findOne({'local.email':req.body.local.email},function(err,user){
            console.log(user);
            if(err) return;
            if(user){
                console.log('here');
                // User already exists handle
            }else{
                console.log(user);
                var newUser = new User();
                newUser.local.email = req.body.local.email;
                newUser.local.firstName = req.body.local.firstName;
                newUser.local.lastName = req.body.local.lastName;
                newUser.local.admin = req.body.local.admin;
                newUser.local.password = newUser.generateHash(req.body.local.password);
                newUser.other.instrument = req.body.other.instrument;
                newUser.save(function(err) {
                    if (err)
                        throw err;
                     User.find({},function(err,users){
                        if(err) return;
                        users.forEach(function(user){
                            user.local.password = '';
                        });
                        console.log(users);
                        res.json(users);
                    });
                });
            }
        });
    },

    // Get single user from database
    getUser : function(req,res){
        console.log('user',JSON.stringify(req.user));
        var id = req.params.id;
        if(req.user && !req.user.local.admin){
          id = req.user.id;
        }
        User.findOne({_id:id},function(err,user){
            if(err) {
                console.log("Err",err);
            }
            delete user.local.password;
            res.json(user);
        });
    },

    // Edit existing user
    editUser : function(req,res){
        User.findOne({_id:req.params.id},function(err,user){
            if(err) return;
            if(user){
                user.local.email = req.body.local.email;
                user.local.firstName = req.body.local.firstName;
                user.local.lastName = req.body.local.lastName;
                user.local.admin = req.body.local.admin;
                if(req.body.local.password != ''){
                    user.local.password = user.generateHash(req.body.local.password);
                }
                user.other.instrument = req.body.other.instrument;
                user.save(function(err) {
                    if (err)
                        throw err;
                    User.find({},function(err,users){
                        if(err) return;
                        users.forEach(function(user){
                            user.local.password = '';
                        });
                        console.log(users);
                        res.json(users);
                    });
                });
            }else{
                // No user handle
                console.log("Not Found");
            }
        });

    },

    // Delete user
    deleteUser :function(req,res){
      User.findOne({_id:req.params.id},function(err,user){
        if(err)
            throw err;
        user.remove(function(err,remove){
            if(err)
                throw err;
            User.find(function(err,users){
                if(err) return;
                users.forEach(function(user){
                    user.local.password = '';
                });
                console.log(users);
                res.json(users);
            });
        });
      });
    }
};
