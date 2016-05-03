/**
 * Created by Kyle Walter on 2/29/2016.
 */
var User = require('../models/user.js');
var nodemailer = require('nodemailer');

module.exports = {

    // Get all users form database
    getUsers : function(req,res){
        User.find({},function(err,users){
            if(err) return;
            users.forEach(function(user){
                user.local.password = '';
            });
            //console.log(JSON.stringify(users));
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
                var newUser = new User();
                if(req.body.local){
                    if(req.body.local.email) newUser.local.email = req.body.local.email;
                    if(req.body.local.firstName)newUser.local.firstName = req.body.local.firstName;
                    if(req.body.local.lastName)newUser.local.lastName = req.body.local.lastName;
                    newUser.local.admin = req.body.local.admin ? (req.body.local.admin) : false;
                    if(req.body.local.password) newUser.local.password = newUser.generateHash(req.body.local.password);
                    if(req.body.local.state) newUser.local.state = parseInt(req.body.local.state);
                }
                if(req.body.sizes){
                    if(req.body.sizes.sex) newUser.sizes.sex = req.body.sizes.sex;
                    if(req.body.sizes.chest) newUser.sizes.chest = req.body.sizes.chest;
                    if(req.body.sizes.armlength) newUser.sizes.armlength = parseInt(req.body.sizes.armlength);
                    if(req.body.sizes.waist) newUser.sizes.waist = parseInt(req.body.sizes.waist);
                    if(req.body.sizes.seat) newUser.sizes.seat = parseInt(req.body.sizes.seat);
                    if(req.body.sizes.outseam) newUser.sizes.outseam = parseInt(req.body.sizes.outseam);
                    if(req.body.sizes.shoe) newUser.sizes.shoe = parseInt(req.body.sizes.shoe);
                    if(req.body.sizes.hat) newUser.sizes.hat = req.body.sizes.hat;
                    if(req.body.sizes.glove) newUser.sizes.glove = req.body.sizes.glove;

                    if(req.body.sizes.tshirt) newUser.sizes.tshirt = req.body.sizes.tshirt;
                }
                if(req.body.other){
                    if(req.body.other.instrument) newUser.other.instrument = req.body.other.instrument;
                }
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
          user.local.password="";
          res.json(user);
      });
    },

    // Edit existing user
    editUser : function(req,res){
        User.findOne({_id:req.params.id},function(err,user){
            console.log("user:",req.body);
            if(err) return;
            if(user){
                if(req.body.local){
                  if(req.body.local.email) user.local.email = req.body.local.email;
                  if(req.body.local.firstName)user.local.firstName = req.body.local.firstName;
                  if(req.body.local.lastName)user.local.lastName = req.body.local.lastName;
                  user.local.admin = req.body.local.admin ? (req.body.local.admin) : false;
                  if(req.body.local.password) user.local.password = user.generateHash(req.body.local.password);
                  if(req.body.local.state) user.local.state = parseInt(req.body.local.state);
                }
                if(req.body.uniform){
                    if(req.body.uniform.jacket) user.uniform.jacket = req.body.uniform.jacket;
                    if(req.body.uniform.jumpsuit) user.uniform.jumpsuit = req.body.uniform.jumpsuit;
                }
                if(req.body.sizes){
                    if(req.body.sizes.sex) user.sizes.sex = req.body.sizes.sex;
                    if(req.body.sizes.chest) user.sizes.chest = req.body.sizes.chest;
                    if(req.body.sizes.armlength) user.sizes.armlength = parseInt(req.body.sizes.armlength);
                    if(req.body.sizes.waist) user.sizes.waist = parseInt(req.body.sizes.waist);
                    if(req.body.sizes.seat) user.sizes.seat = parseInt(req.body.sizes.seat);
                    if(req.body.sizes.outseam) user.sizes.outseam = parseInt(req.body.sizes.outseam);
                    if(req.body.sizes.shoe) user.sizes.shoe = parseInt(req.body.sizes.shoe);
                    if(req.body.sizes.hat) user.sizes.hat = req.body.sizes.hat;
                    if(req.body.sizes.glove) user.sizes.glove = req.body.sizes.glove;

                  if(req.body.sizes.tshirt) user.sizes.tshirt = req.body.sizes.tshirt;
                }
                if(req.body.other){
                    if(req.body.other.instrument) user.other.instrument = req.body.other.instrument;
                }
                console.log(user.uniform);
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

    // emailConfirmation: function(req, res){
    //   console.log("in sendconfirmation");
    //   var transporter = nodeMailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //       user: 'SalukiUniforms@gmail.com',
    //       pass: 'titanburg'
    //     }
    //   });
    //
    //   console.log("SEND CONFIRMATION~~~~~~~~" + req.session);
    //   console.log("SEND CONFIRMATION~~~~~~~~~~~~~~~" + req.body.email);
    //
    //   var mailOptions = {
    //     from: '/*firstName from session*/ /*lastName from session*/ <SalukiUniforms@gmail.com>',
    //     to: '//user email that was approved',
    //     subject: 'Band Uniform Account Confirmed',
    //     text: 'Your account on the SIU Band Uniform app has been approved and is now active! Login at titanburg.me to set up your account',
    //     html: '<p>Your account on the SIU Band Uniform app has has been <b>approved</b> and is now active! Login at titanburg.me to set up your account</p>'
    //   };
    //
    //   transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //       console.log(error);
    //     }
    //     else {
    //       console.log('Message sent <3' + info.response);
    //     }
    //   });
    // }
};
