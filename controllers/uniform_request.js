var Urequest = require('../models/uniform_request.js');

module.exports = {

    getUrequests : function(req,res){
        Urequest.find({},function(err,urequests){
            if(err) return;
            console.log(urequests);
            res.json(urequests);
        });
    },

        // *** post ALL urequests *** //
    newUrequest : function(req, res) {
      var newUrequest = new Urequest({
        userNumber: req.body.userNumber,
        complete: req.body.complete,
        jumpsuitNumber: req.body.jumpsuitNumber,
        jacketNumber: req.body.jacketNumber
      });
      newUrequest.save(function(err) {
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'SUCCESS': newUrequest});
        }
      });
    },

    getUrequest : function(req,res){
        console.log("getUrequest called:",req.params.id)
        Urequest.findOne({_id:req.params.id},function(err,urequest){
            if(err) {
                console.log("Err",err);
            }
            res.json(urequest);
        });
    },

    // *** edit SINGLE urequest *** //
    editUrequest : function(req, res) {
      Urequest.findById(req.params.id, function(err, urequest) {
        urequest.userNumber = req.body.userNumber;
        urequest.complete = req.body.complete;
        urequest.jacketNumber = req.body.jacketNumber;
        urequest.jumpsuitNumber = req.body.jumpsuitNumber;
        urequest.save(function(err) {
          if(err) {
            res.json({'ERROR': err});
          } else {
            res.json({'UPDATED': urequest});
          }
        });
      });
    },

    // *** delete SINGLE urequest *** //
    deleteUrequest : function(req, res) {
      Urequest.findOne({_id:req.params.id},function(err,urequest){
        if(err)
            throw err;
        urequest.remove(function(err,remove){
            if(err)
                throw err;
            Urequest.find(function(err,urequests){
                if(err) return;
                console.log(urequests);
                res.json(urequests);
            });
        });
      });
    }
};
