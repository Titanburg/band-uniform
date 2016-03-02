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
                // newUser.local.password = newUser.generateHash(req.body.password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                });
            }
        });
    },

    // Get single user from database
    getUser : function(req,res){
        console.log("getUser called:",req.params.id)
        User.findOne({_id:req.params.id},function(err,user){
            if(err) {
                console.log("Err",err);
            }
            user.local.password = '';
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
                //if(req.body.password != ''){
                //    user.local.password = user.generateHash(req.body.password);
                //}
                user.save(function(err) {
                    if (err)
                        throw err;
                    return;
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
        user.remove().exec($scope.getUsers());
      });
    }
};
