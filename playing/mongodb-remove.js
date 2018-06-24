const {ObjectId} = require('mongodb');   // HARUS namanya ObjectID ... sesuai dengan data dari MONGO DB
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// delete multiple record

/**
 * $$ 1
 * Todo.remove({
 *  // code here
 * })
 * 
 * $$ 2  
 * Todo.findOneAndRemove({})
 * Todo.findByIdAndRemove
 * 
 */

// Todo.remove({}).then((hasil) => {
//     console.log(hasil);
// });

Todo.findByIdAndRemove({
    _id : new ObjectId('5b2feede5c94d2161ce34463')
}).then((hasil) => {
    console.log(hasil);
});