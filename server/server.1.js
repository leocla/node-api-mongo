/**
 * CREATE SERVER
 * 
 */

 var mongoose = require('mongoose');

 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost:27017/TodoAplikasi');

 // save sesuatu

 // create mongo model

 /**
  * pada monggose.. auto LOWERCASE..
  * pembuatan model mongoose ... auto menambahkan 's'
  * misalnya... Todo ---> todos
  *         ... Todoks --> todoks
  *         ... Todoks --> todoks (TETAP)
  */
 var Todo = mongoose.model('Todoks', {   
    text : {
        type: String,
        required : true,
        minlength: 7,
        trim : true // trim true digunakan untuk menghilangkan spasi di awal jika ada, 
    }, 
    completed : {
        type: Boolean
    },
    completedAt : {
        type: Number
    }
 });


 // creating
 //constructor function ... instance from Todo
 /*
 var newTodo = new Todo({
     text : 'Makan makan terus aja',
     completed : true,
     completedAt : now
 });

 newTodo.save().then((docs) => {
    console.log('Berhasil~! menyimpan database ', JSON.stringify(docs, undefined, 2));
 }, (e) => {
    console.log('Gagal untuk menyimpan Todo');
 }); */

//  var otherTodo = new Todo({
//      text: 'Memberi makan ayam',
//      completed: true,
//      completedAt : 123
//  });

var otherTodo = new Todo({
    text: 'try system'
});

 otherTodo.save().then((hore) => {
     console.log(JSON.stringify(hore, undefined, 2));
 }, (err) => {
     console.log('GAGAL BRO>>>> menyimpan gagal~!', err);
 });