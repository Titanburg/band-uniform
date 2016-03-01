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
        User.find({email:req.body.email},function(err,user){
            if(err) return;
            if(user){
                // User already exists handle
            }else{
                var newUser = new User();
                newUser.local.email = req.body.email;
                newUser.local.firstName = req.body.firstName;
                newUser.local.lastName = req.body.lastName;
                newUser.local.admin = req.body.admin;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    },

    // Get single user from database
    getUser : function(req,res){
        User.find({id:req.params.id},function(err,users){
            if(err) return;
            users.forEach(function(user){
                user.local.password = '';
            });
            console.log(users);
            res.json(users);
        });
    },

    // Edit existing user
    editUser : function(req,res){
        User.find({email:req.body.email},function(err,user){
            if(err) return;
            if(user){
                var newUser = new User();
                newUser.local.email = req.body.email;
                newUser.local.firstName = req.body.firstName;
                newUser.local.lastName = req.body.lastName;
                newUser.local.admin = req.body.admin;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }else{
                // No user handle
            }
        });
    },

    // Delete user
    deleteUser :function(req,res){
        User.find({email:req.body.email},function(err,user){
            if(err) return;
            if(!user){
                var newUser = new User();
                newUser.local.email = req.body.email;
                newUser.local.firstName = req.body.firstName;
                newUser.local.lastName = req.body.lastName;
                newUser.local.admin = req.body.admin;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    }
};
