var Jacket = require('../models/uniform/jacket.js');

module.exports = {

    getJackets : function(req,res){
        Jacket.find({},function(err,jackets){
            if(err) return;
            console.log(jackets);
            res.json(jackets);
        });
    },

        // *** post ALL jackets *** //
    newJacket : function(req, res) {
      var newJacket = new Jacket({
        number: req.body.number,
        sex: req.body.sex,
        chest: req.body.chest,
        armlength: req.body.armlength,
        available: req.body.available
      });
      newJacket.save(function(err) {
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'SUCCESS': newJacket});
        }
      });
    },

    getJacket : function(req,res){
        console.log("getJacket called:",req.params.id)
        Jacket.findOne({_id:req.params.id},function(err,jacket){
            if(err) {
                console.log("Err",err);
            }
            res.json(jacket);
        });
    },

    // *** edit SINGLE jacket *** //
    editJacket : function(req, res) {
      Jacket.findById(req.params.id, function(err, jacket) {
        jacket.number = req.body.number;
        jacket.sex = req.body.sex;
        jacket.chest = req.body.chest;
        jacket.armlength = req.body.armlength;
        jacket.available = req.body.available;
        jacket.save(function(err) {
          if(err) {
            res.json({'ERROR': err});
          } else {
            res.json({'UPDATED': jacket});
          }
        });
      });
    },

    // *** delete SINGLE jacket *** //
    deleteJacket : function(req, res) {
      Jacket.findOne({_id:req.params.id},function(err,jacket){
        if(err)
            throw err;
        jacket.remove(function(err,remove){
            if(err)
                throw err;
            Jacket.find(function(err,jackets){
                if(err) return;
                console.log(jackets);
                res.json(jackets);
            });
        });
      });
    }
};
