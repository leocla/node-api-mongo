const mongoose = require('mongoose');
const validator = require('validator');

const jwt = require('jsonwebtoken');
const _ = require('lodash');

// skema constructor function
var UserSkema = new mongoose.Schema({
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

// EMBUH iki... ~~~~ untuk menyembunyikan PASSWORD + token
UserSkema.methods.toJSON = function() {
    var UserData = this;
    var userObjek = UserData.toObject();

    return _.pick(userObjek, ['_id', 'email']);
};

// tidak bisa pake arrow function
UserSkema.methods.generateAuthToken = function (){
    var dataUser = this;
    var access = 'auth';
    var token = jwt.sign({_id: dataUser._id.toHexString(), access}, 'abc123').toString();

    // data.tokens.push({access, token}); // FAILED
    dataUser.tokens = dataUser.tokens.concat([{access, token}]); // NEW UPDATE METHOD

    return dataUser.save().then(() => {
        return token;
    });
};

var UserData = mongoose.model('User', UserSkema);

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