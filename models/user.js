var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema  = mongoose.Schema({
    local: {
        email: {
            type: String,
            match: /.+@.+\..+/,
            required: true
        },
        password: {
            type: String
            // validate: [
            //     function(password) {
            //         return password.length >= 6;
            //     },
            //     'Password needs to be at least 6 characters long.'
            // ],
            // required: true
        },
        admin: Boolean,
        firstName: {
            type: String,
            match: /[a-zA-Z]*/
        },
        lastName: {
            type: String,
            match: /[a-zA-Z]*/
        }
    },
    uniform:{
        jacket: Number,
        jumpsuit: Number,
        hat: Number
    },
    sizes: {
        sex: {
            type: String
            // enum: ['Male', 'Female', 'Other']
        },
        chest: Number,
        armlength: Number,
        waist: Number,
        seat: Number,
        outseam: Number,
        hat: {
            type: String,
            enum: ['Small', 'Medium', 'Large']
        },
        glove: {
            type: String,
            enum: ['Small', 'Medium', 'Large']
        },
        shoe: Number,
        tshirt: {
            type: String,
            enum: ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large']
        }
    },
    other:{
        instrument: String,
        years: String
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
