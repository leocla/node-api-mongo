const mongoose = require('mongoose');
const validator = require('validator');

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

// generate token method
UserSkema.statics.findByToken = function(token){
    var User = this;
    var decoded; // undefinde variable

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((terima, tolak) => {
        //     tolak();
        // });
        return Promise.reject();
    }

    //success case
    return User.findOne({
        '_id' : decoded._id,
        'tokens.token': token,
        'tokens.access' : 'auth'
    });
};


//hashing password
UserSkema.pre('save', function(next){
    var userHehe = this;
    //var password = _.pick()
    if (userHehe.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(userHehe.password, salt, (err, hash) => {
                //console.log(hash);
                userHehe.password = hash; // overwrite
                next();
            });
        });
    } else {
        next();
    }
});

var UserData = mongoose.model('User', UserSkema); // di dalam kurung memanggil data dari UserSkema di atas

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