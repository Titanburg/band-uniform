var Urequest = require('../models/uniform_request.js');
var Jumpsuit = require('../models/uniform/jumpsuit.js');
var Jacket = require('../models/uniform/jacket.js');

module.exports = {

    getUrequests : function(req,res){
        Urequest.find({},function(err,urequests){
            if(err) return;
            console.log(urequests);
            res.json(urequests);
        });
    },

    newUrequest : function(req, res) {
      var newUrequest = new Urequest({
        userNumber: req.body.userNumber,
        complete: req.body.complete,
        jumpsuitNumber: req.body.jumpsuitNumber,
        jacketNumber: req.body.jacketNumber,
        chest : req.body.chest,
        armlength : req.body.armlength,
        waist: req.body.waist,
        seat: req.body.seat,
        outseam : req.body.outseam
      });
      newUrequest.save(function(err) {
        if(err) {
          res.json({'ERROR': err});
        } else {
          Urequest.find({},function(err,urequests){
              if(err) return;
              console.log(urequests);
              res.json(urequests);
          });
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
        urequest.chest =req.body.chest;
        urequest.armlength=req.body.armlength;
        urequest.waist=req.body.waist;
        urequest.seat= req.body.seat;
        urequest.outseam =req.body.outseam;
        urequest.save(function(err) {
        if(err) {
            res.json({'ERROR': err});
          } else {
            Urequest.find({},function(err,urequests){
                if(err) return;
                console.log(urequests);
                res.json(urequests);
            });
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
    },

    bestMatch : function(req, res) {
      Urequest.findById(req.params.id, function(err, urequest) {
        urequest.jumpsuitNumber = jumpsuit.findOne(
          {waist: {$gt: urequest.waist}},
          {outseam: {$gt: urequest.outseam}},
          {hips: {$gt: urequest.hips}}
        );
        urequest.jacketNumber = Jacket.jacket.findOne(
          {waist: {$gt: urequest.chest}},
          {outseam: {$gt: urequest.armlength}}
        );
        console.log("urequest.jumpsuitNumber");
        urequest.save(function(err) {
        if(err) {
            res.json({'ERROR': err});
          } else {
            Urequest.find({},function(err,urequests){
                if(err) return;
                console.log(urequests);
                console.log("FUCK");
                res.json(urequests);
            });
          }
        });
      });
    }
};
