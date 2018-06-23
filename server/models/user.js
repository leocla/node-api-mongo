var mongoose = require('mongoose');

// OBJEK
var UserData = mongoose.model('User', {
    email : {
        type: String,
        required : true,
        trim : true,
        minlength: 2
    },
    password : {
        type : String
        
    }
});

module.exports = {UserData};