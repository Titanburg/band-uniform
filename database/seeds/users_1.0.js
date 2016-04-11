var User = require('../../models/user.js');

User.findOne({'local.email':'admin@siu.edu'},function(err,user){if(err) return;
    if(user){
        //console.log('Mongoose:      Admin already seeded');
    } else {
        var adminUser = new User();
        adminUser.local = {};
        adminUser.local.email = 'admin@siu.edu';
        adminUser.local.password = adminUser.generateHash('heykirk');
        adminUser.local.admin = true;
        adminUser.local.firstName = 'Anaitirkyle';
        adminUser.local.lastName = 'Koarrowelter';

        adminUser.save(function(err) {
            if (err)
                throw err;
        })
    }
});
