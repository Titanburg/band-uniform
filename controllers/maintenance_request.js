var request = require('../models/maintenance_request.js');

module.exports = {
    getRequests : function(req,res){
        request.find({},function(err,request){
            if(err) return;
            console.log(requests);
            res.json(requests);
        });
    },
    newRequest : function(req,res){},
    getRequest : function(req,res){},
    editRequest : function(req,res){},
    deleteRequest :function(req,res){}
};
