const mongoose = require('mongoose');
const validator = require('validator');


// OBJEK
var UserData = mongoose.model('User', {
    email : {
        type: String,
        required : true,
        trim : true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password : {
        type : String,
        required : true,
        minlength: 7
    },
    tokens: [{
        access : {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

module.exports = {UserData};



/**
 * ~~~~~~~~~~  // akan belajar
 * 1. email + password hashing ---- kriptografi pass
 * 2. token
 * 3. access auth
 * ~~~~~~~~~~
 * install validator --- misalnya digunakan untuk cek email yang valid
 * ~~~~~~~~~ $ npm i validator --save
 * perintah --save digunakan untuk update file package.json
 */