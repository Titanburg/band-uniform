var Request = require('../models/maintenance_request.js');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

    getRequests : function(req,res){
      var filter = {};
      if(req.user && !req.user.local.admin){
        filter = {email:req.user.local.email};
      }
      console.log(filter);
      Request.find(filter,function(err,requests){
          if(err) return;
          console.log(requests);
          res.json(requests);
      });
    },

        // *** post ALL requests *** //
    newRequest : function(req, res) {
      var newRequest = new Request(req.body);
      newRequest.save(function(err) {
        if(err) {
          res.json({'ERROR': err});
        } else {
          var filter = {};
          if(req.user && !req.user.local.admin){
            filter = {email:req.user.local.email};
          }
          console.log(filter);
          Request.find(filter,function(err,requests){
              if(err) return;
              console.log(requests);
              res.json(requests);
          });
        }
      });
    },

    getRequest : function(req,res){
        console.log("getRequest called:",req.params.id);
        Request.findOne({_id:req.params.id},function(err,request){
            if(err) {
                console.log("Err",err);
            }
            res.json(request);
        });
    },

    // *** edit SINGLE request *** //
    editRequest : function(req, res) {
      Request.findById(req.params.id, function(err, request) {
        request.firstName = req.body.firstName;
        request.lastName = req.body.lastName;
        request.email = req.body.email;
        request.piece = req.body.piece;
        request.description = req.body.description;
        request.save(function(err) {
          if(err) {
            res.json({'ERROR': err});
          } else {
            var filter = {};
            if(req.user && !req.user.local.admin){
              filter = {email:req.user.local.email};
            }
            Request.find(filter,function(err,requests){
                if(err) return;
                console.log(requests);
                res.json(requests);
            });
          }
        });
      });
    },

    // *** delete SINGLE request *** //
    deleteRequest : function(req, res) {
      Request.findOne({_id:req.params.id},function(err,request){
        if(err)
            throw err;
        request.remove(function(err,remove){
            if(err)
                throw err;
            var filter = {};
            if(req.user && !req.user.local.admin){
              filter = {email:req.user.local.email};
            }
            Request.find(filter,function(err,requests){
                if(err) return;
                console.log(requests);
                res.json(requests);
            });
        });
      });
    }
};
