
// USer mODEL
/// email, pass, 
/// email - require - trim - type string - min length 1

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoAplikasi');

var SkemaUser = mongoose.model('users', {   
    email : {
        type: String,
        required: true,
        minlength: 5,
        trim : true
    },
    password : {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    }
});

var DataHore = new SkemaUser({
    email: "tinoo@tono.com",
    password : "dAidnbAUFDB"
});

DataHore.save().then((horejos) => {
    console.log(JSON.stringify(horejos, undefined, 2));
}, (err) => {
    console.log('GAGAL BRO>>>> menyimpan gagal~!', err);
});

