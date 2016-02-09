

// Import database models for uniform
var seed = [];



// Jacket Model and Data
seed.push({name:'Jacket',model : require('../../models/uniform/jacket.js'),
data : [
  {number:201,sex:'m',chest:38,armlength:'S',available:true},
  {number:214,sex:'m',chest:40,armlength:'R',available:true},
  {number:210,sex:'m',chest:38,armlength:'L',available:true},
  {number:176,sex:'f',chest:34,armlength:'S',available:true},
  {number:179,sex:'f',chest:38,armlength:'R',available:true},
  {number:182,sex:'f',chest:42,armlength:'L',available:true}
]});

// Jumpsuit Model and Data
seed.push({name:'Jumpsuit',model:require('../../models/uniform/jumpsuit.js'),
data:[
  {number:100,sex:'m',waist:20,seat:20,outseam:20,available:true},
  {number:100,sex:'m',waist:20,seat:20,outseam:20,available:true},
  {number:100,sex:'m',waist:20,seat:20,outseam:20,available:true},
  {number:102,sex:'f',waist:28,seat:40,outseam:40,available:true},
  {number:138,sex:'f',waist:34,seat:46,outseam:38,available:true},
  {number:150,sex:'f',waist:42,seat:54,outseam:38,available:true}
]});


// Hat Model and Data
// TODO: Get actual hat data
seed.push({name:'Hat',model :require('../../models/uniform/hat.js'),data:[
  {number:100,size:'s'},
  {number:101,size:'m'},
  {number:102,size:'l'},
  {number:103,size:'xl'},
  {number:104,size:'m'},
  {number:105,size:'l'}
]});

// Seed

seed.forEach(function(model){
  model.data.forEach(function(data){
    model.model.findOne({number: data.number},function(err,d){
      if(err) return error;
      if(d){
        console.log('Mongoose:      ' + model.name + ' ' + data.number + ' already seeded');
      }else{
        var entry = new model.model();
        for(var key in data){
          entry[key] = data[key];
        }
        entry.save(function(err){
            if(err)
                throw err;
            else
              console.log('Mongoose:      ' + model.name + ' seeded');
        });
      }
    });
  });
});
