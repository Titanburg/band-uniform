var Request = require('../models/request.js');

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
        userNumber: req.body.userNumber,
        complete: req.body.complete
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
        request.userNumber = req.body.userNumber;
        request.complete = req.body.complete;
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
