

// Import database models for uniform
var seed = [];



// // Piccolos Model and Data
// seed.push({name:'Piccolos',model : require('../../models/instrument/piccolos.js'),
// data : [
//   {name:'Piccolos',jacket:1,jumpsuit:1,hat:1,gloves:1}
// ]});

// // Clarinets Model and Data
// seed.push({name:'Clarinets',model : require('../../models/instrument/clarinets.js'),
// data : [
//   {name:'Clarinets',jacket:1,jumpsuit:1,hat:1,gloves:1}
// ]});

// // Saxophones Model and Data
// seed.push({name:'Saxophones',model : require('../../models/instrument/saxophones.js'),
// data : [
//   {name:'Saxophones',jacket:1,jumpsuit:1,hat:1,gloves:1}
// ]});

// // Trumpets Model and Data
// seed.push({name:'Trumpets',model : require('../../models/instrument/trumpets.js'),
// data : [
//   {name:'Trumpets',jacket:1,jumpsuit:1,hat:1,gloves:1}
// ]});

// // Mellophones Model and Data
// seed.push({name:'Mellophones',model : require('../../models/instrument/mellophones.js'),
// data : [
//   {name:'Mellophones',jacket:1,jumpsuit:1,hat:1,gloves:1}
// ]});

// // Baritones Model and Data
// seed.push({name:'Baritones',model : require('../../models/instrument/baritones.js'),
// data : [
//   {name:'Baritones',jacket:1,jumpsuit:1,hat:1,gloves:1}
// ]});

// // Trombones Model and Data
// seed.push({name:'Trombones',model : require('../../models/instrument/trombones.js'),
// data : [
//   {name:'Trombones',jacket:1,jumpsuit:1,hat:1,gloves:1}
// ]});

// // Sousaphones Model and Data
// seed.push({name:'Sousaphones',model : require('../../models/instrument/sousaphones.js'),
// data : [
//   {name:'Sousaphones',jacket:1,jumpsuit:1,hat:1,gloves:1}
// ]});

// // Percussion Model and Data
// seed.push({name:'Percussion',model : require('../../models/instrument/percussion.js'),
// data : [
//   {name:'Percussion',jacket:1,jumpsuit:1,hat:1,gloves:1}
// ]});

// // Drums Model and Data
// seed.push({name:'Drums',model : require('../../models/instrument/drums.js'),
// data : [
//   {name:'Drums',jacket:1,jumpsuit:1,hat:1,gloves:1}
// ]});

// Instruments Model and Data
seed.push({name:'Instruments',model : require('../../models/instruments.js'),
data : [
  {name:'Piccolos',group:'Woodwinds',jacket:1,jumpsuit:1,hat:1,gloves:1},
  {name:'Clarinets',group:'Woodwinds',jacket:1,jumpsuit:1,hat:1,gloves:1},
  {name:'Saxophones',group:'Woodwinds',jacket:1,jumpsuit:1,hat:1,gloves:1},
  {name:'Trumpets',group:'Woodwinds',jacket:1,jumpsuit:1,hat:1,gloves:1},
  {name:'Mellophones',group:'Woodwinds',jacket:1,jumpsuit:1,hat:1,gloves:1},
  {name:'Baritones',group:'Woodwinds',jacket:1,jumpsuit:1,hat:1,gloves:1},
  {name:'Trombones',group:'Woodwinds',jacket:1,jumpsuit:1,hat:1,gloves:1},
  {name:'Sousaphones',group:'Sousas',jacket:3,jumpsuit:3,hat:3,gloves:3},
  {name:'Percussion',group:'Percussion',jacket:1,jumpsuit:1,hat:1,gloves:0},
  {name:'Drums',group:'Drum Majors',jacket:2,jumpsuit:1,hat:1,gloves:2}
]});

// Seed

seed.forEach(function(model){
  model.data.forEach(function(data){
    model.model.findOne({number: data.number},function(err,d){
      if(err) return error;
      if(d){
        //console.log(/*'Mongoose:      ' + model.name + ' ' + data.name + ' already seeded'*/);
      }else{
        var entry = new model.model();
        for(var key in data){
          entry[key] = data[key];
        }
        entry.save(function(err){
            if(err)
                throw err;
            //else
            //  console.log(/*'Mongoose:      ' + model.name + ' seeded'*/);
        });
      }
    });
  });
});
