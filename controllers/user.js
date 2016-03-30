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
            console.log(JSON.stringify(users));
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
                var newUser = new User(req.body);
                // newUser.local.email = req.body.local.email;
                // newUser.local.firstName = req.body.local.firstName;
                // newUser.local.lastName = req.body.local.lastName;
                // newUser.local.admin = req.body.local.admin;
                // newUser.local.password = newUser.generateHash(req.body.local.password);
                // newUser.other.instrument = req.body.other.instrument;
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
        console.log("getUser called:",req.params.id);
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
                if(req.body.local){
                  if(req.body.local.email) user.local.email = req.body.local.email;
                  if(req.body.local.firstName)user.local.firstName = req.body.local.firstName;
                  if(req.body.local.lastName)user.local.lastName = req.body.local.lastName;
                  user.local.admin = req.body.local.admin ? (req.body.local.admin) : false;
                  if(req.body.local.password) user.local.password = user.generateHash(req.body.local.password);
                }
                if(req.body.sizes){
                  if(req.body.sizes.sex) user.sizes.sex = req.body.sizes.sex;
                  if(req.body.sizes.chest) user.sizes.chest = req.body.sizes.chest;
                  if(req.body.sizes.armlength) user.sizes.armlength = parseInt(req.body.sizes.armlength);
                  if(req.body.sizes.waist) user.sizes.waist = parseInt(req.body.sizes.waist);
                  if(req.body.sizes.seat) user.sizes.seat = parseInt(req.body.sizes.seat);
                  if(req.body.sizes.outseam) user.sizes.outseam = parseInt(req.body.sizes.outseam);
                  if(req.body.sizes.hat) user.sizes.hat = parseInt(req.body.sizes.hat);
                  if(req.body.sizes.glove) user.sizes.glove = req.body.sizes.glove;
                  if(req.body.sizes.shoe) user.sizes.shoe = parseInt(req.body.sizes.shoe);
                  if(req.body.sizes.tshirt) user.sizes.tshirt = req.body.sizes.tshirt;
                }
                if(req.body.other){
                  if(req.body.other.instrument) user.other.instrument = req.body.other.instrument;
                }
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
