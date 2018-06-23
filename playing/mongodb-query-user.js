const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {UserData} = require('./../server/models/user');


// var email = "tono@tono.com"
// UserData.findOne({
//     email: email
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
// }).catch((err) => console.log(err));

var id = "5b2d096cfa7aed247cba71a6";

// UserData.findById(id).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
// }).catch((err) => console.log(err));

UserData.findById(id).then((user) => {
    if(!user){ // JIKA USER ID yang dicari tidak ketemu
        return console.log('Data tidak ditemukan... ~hahaha'); // jika ID valid namun data tidak ada
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (err) => {
    //console.log(err);  // JIKA ID tidak valid masuk sini
    console.log('User ID tidak VALID');
})