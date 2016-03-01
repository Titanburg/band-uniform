/**
 * Created by Kyle Walter on 2/29/2016.
 */
module.exports = {
    User : require('../models/user.js'),
    getUsers : function(req,res){
        User.find({},function(err,users){
            if(err) return;
            users.each(function(user){
                user.local.password = '';
            })
            res.json(users);
        });
    },
    newUser : function(req,res){},
    getUser : function(req,res){},
    editUser : function(req,res){},
    deleteUser :function(req,res){}
}