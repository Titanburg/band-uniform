var Jumpsuit = require('../models/uniform/jumpsuit.js');

module.exports = {

    getJumpsuits : function(req,res){
        Jumpsuit.find({},function(err,jumpsuits){
            if(err) return;
            console.log(jumpsuits);
            res.json(jumpsuits);
        });
    },

        // *** post ALL jumpsuits *** //
    newJumpsuit : function(req, res) {
      var newJumpsuit = new Jumpsuit({
        number: req.body.number,
        sex: req.body.sex,
        waist: req.body.waist,
        seat: req.body.seat,
        outseam: req.body.outseam,
        available: req.body.available
      });
      newJumpsuit.save(function(err) {
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'SUCCESS': newJumpsuit});
        }
      });
    },

    getJumpsuit : function(req,res){
        console.log("getJumpsuit called:",req.params.id)
        Jumpsuit.findOne({_id:req.params.id},function(err,jumpsuit){
            if(err) {
                console.log("Err",err);
            }
            res.json(jumpsuit);
        });
    },

    // *** edit SINGLE jumpsuit *** //
    editJumpsuit : function(req, res) {
      Jumpsuit.findById(req.params.id, function(err, jumpsuit) {
        if(req.body.number) jumpsuit.number = parseInt(req.body.number);
        if(req.body.sex) jumpsuit.sex = req.body.sex;
        if(req.body.waist) jumpsuit.waist = parseInt(req.body.waist);
        if(req.body.seat) jumpsuit.seat = parseInt(req.body.seat);
        if(req.body.outseam) jumpsuit.outseam = parseInt(req.body.outseam);
        if(req.body.available) jumpsuit.available = req.body.available;
        jumpsuit.save(function(err) {
          if(err) {
            res.json({'ERROR': err});
          } else {
            res.json({'UPDATED': jumpsuit});
          }
        });
      });
    },

    // *** delete SINGLE jumpsuit *** //
    deleteJumpsuit : function(req, res) {
      Jumpsuit.findOne({_id:req.params.id},function(err,jumpsuit){
        if(err)
            throw err;
        jumpsuit.remove(function(err,remove){
            if(err)
                throw err;
            Jumpsuit.find(function(err,jumpsuits){
                if(err) return;
                console.log(jumpsuits);
                res.json(jumpsuits);
            });
        });
      });
    }
};
