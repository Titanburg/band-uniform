var Instrument = require('../models/instruments.js');

module.exports = {

    // Get all instruments form database
    getInstruments : function(req,res){
        Instrument.find({},function(err,instruments){
            if(err) return;
            console.log(instruments);
            res.json(instruments);
        });
    },

    // Create new instrument in database
    newInstrument : function(req,res){
        Instrument.findOne({'local.name':req.body.local.name},function(err,instrument){
            console.log(instrument);
            if(err) return;
            if(instrument){
                console.log('here');
                // Instrument already exists handle
            }else{
                console.log(instrument);
                var newInstrument = new Instrument();
                newInstrument.local.name = req.body.local.name;
                newInstrument.local.group = req.body.local.group;
                newInstrument.save(function(err) {
                    if (err)
                        throw err;
                    Instrument.find({},function(err,instruments){
                        if(err) return;
                        console.log(instruments);
                        res.json(instruments);
                    });
                });
            }
        });
    },

    // Get single instrument from database
    getInstrument : function(req,res){
        console.log("getInstrument called:",req.params.id)
        Instrument.findOne({_id:req.params.id},function(err,user){
            if(err) {
                console.log("Err",err);
            }
            res.json(instrument);
        });
    },

    // Edit existing instrument
    editInstrument : function(req,res){
        Instrument.findOne({_id:req.params.id},function(err,instrument){
            if(err) return;
            if(instrument){
                instrument.local.name = req.body.local.name;
                instrument.local.group = req.body.local.group;
                instrument.save(function(err) {
                    if (err)
                        throw err;
                    Instrument.find({},function(err,instruments){
                        if(err) return;
                        console.log(instruments);
                        res.json(instruments);
                    });
                });
            }else{
                // No user handle
                console.log("Not Found");
            }
        });        
    },

    // Delete instrument
    deleteInstrument :function(req,res){
      Instrument.findOne({_id:req.params.id},function(err,user){
        if(err)
            throw err;
        instrument.remove(function(err,remove){
            if(err)
                throw err;
            Instrument.find(function(err,instruments){
                if(err) return;
                console.log(instruments);
                res.json(instruments);
            });
        });
      });
    }
};
