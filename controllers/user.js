/**
 * Created by Kyle Walter on 2/29/2016.
 */
var User = require('../models/user.js');

module.exports = {
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
    newUser : function(req,res){},
    getUser : function(req,res){},
    editUser : function(req,res){},
    deleteUser :function(req,res){}
};
