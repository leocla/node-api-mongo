const {ObjectId} = require('mongodb');   // HARUS namanya ObjectID ... sesuai dengan data dari MONGO DB
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5b2e7cc8a0e9383138a32db211'; // ex ID

if(!ObjectId.isValid(id)){
    console.log('ID tidak valid~!');
}



// jika id tidak sesuai,, maka muncul []
// tapi jika id.length tidak sesuai maka akan error  (INVALID ID)
// cara menangani INVALID ID dengan menggunakan catch


// Todo.find({
//     _id : id
// }).then((todos) => {
//     //console.log('Todos', todos);
//     console.log('============= Todo find');
//     console.log(JSON.stringify(todos, undefined, 2));
// }).catch((eror) => console.log(eror));

// // jika id tidak sesuai.. maka muncul null
// Todo.findOne({
//     _id : id
// }).then((todo) => {
//     //console.log('Todo', todo);
//     if(!todo){   // jika tidak ada todo
//         return console.log('Id not FOUND');
//     }
//     console.log('===============  Todo findOne');
//     console.log(JSON.stringify(todo, undefined, 2));
// }).catch((eror) => console.log(eror));

// jika id tidak sesuai..
Todo.findById(id).then((todo) => {
    if(!todo){   // jika tidak ada todo
        return console.log('id not FOUND');
    }
    console.log('============  Todo By ID');
    console.log(JSON.stringify(todo, undefined, 2));
})
.catch((eror) => 
    console.log(eror)
);