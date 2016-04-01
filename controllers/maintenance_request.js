var Request = require('../models/maintenance_request.js');

module.exports = {

    getRequests : function(req,res){
        Request.find({},function(err,requests){
            if(err) return;
            console.log(requests);
            res.json(requests);
        });
    },

        // *** post ALL requests *** //
    newRequest : function(req, res) {
      var newRequest = new Request({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        piece: req.body.piece,
        description: req.body.description
      });
      newRequest.save(function(err) {
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'SUCCESS': newRequest});
        }
      });
    },

    getRequest : function(req,res){
        console.log("getRequest called:",req.params.id)
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
        request.piece = req.body.piece;
        request.description = req.body.description;
        request.save(function(err) {
          if(err) {
            res.json({'ERROR': err});
          } else {
            res.json({'UPDATED': request});
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
            Request.find(function(err,requests){
                if(err) return;
                console.log(requests);
                res.json(requests);
            });
        });
      });
    }
};
