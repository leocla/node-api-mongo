var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo'); // get todo.js
var {UserData} = require('./models/user'); //get user.js

var app = express();
const port = process.env.PORT || 4000; /// FOR HEROKU DEPLOY
/// PORTnya diganti ke 4000 --- untuk MLAB
//var port = 3000;

// CONFIGURE THE MIDDLEWARE
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({
        data : 'hore'
    });
});

/**
 * CRUD ~~~~~~
 * C - create
 * R - read
 * U - update
 * D - delete
 */

 app.post('/todos', (req, res) => {
     // cuma ngeprint aja bos
    //var post_hasil = req.body;
    //console.log(JSON.stringify(post_hasil, undefined, 2));

    //memasukan ke dalam mongo db
    var todo = new Todo({  /// Todo (T besar...) --> sudah dideklarasikan
        text : req.body.text
    });

    // simpan ke dalam database
    todo.save().then((dokumen) => {
        res.send(dokumen);
    }, (err) => {
        res.status(400).send(err);
       // console.log('Gagal menyimpan database', err); /// AJA DI print ... g*b*lk~!
    });
 });

 app.post('/user', (req, res) => {
     var pot = req.body;
     console.log(JSON.stringify(pot, undefined, 2));

     var asik = new UserData({
         email : req.body.email,
         password : req.body.password
     });

     asik.save().then((data) => {
        res.send(data);
     }, (err) => {
         res.status(400).send(err);
         /////// console.log("gagal menyimpan", err);
     });
 });

 // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 // GET DATA
app.get('/todos', (req, res) => {
    Todo.find().then((data_todos) => {
        res.send({
            data_todos
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/user', (req, res) => {
    UserData.find().then((data_baru) => {
        res.send({
            data_baru
        });
    }, (err) => {
        res.status(400).send(err);
    });
});


// GET /todos/12345555553
/// URL parameter
app.get('/todos/:id', (request, respond) => {
    var id = request.params.id;
    // TestCase1
    if(!ObjectID.isValid(id)){
        return respond.status(404).send();
    }
    // TestCase2
    Todo.findById(id).then((todo_ini) => {
        if(!todo_ini) {
            return respond.status(404).send();
        }
        // TestCase3
        respond.send({todo_ini}); // JIKA BERHASIL mendapatkan ID yang sesuai kesini
    }).catch((e) => {
        res.status(400).send(); // INVALID REQuest
    });
});

// DELETE ROUTE
app.delete('/todos/:id', (req, res) => {
    // get ID   [✓]
    /// validate ID    [✓]
    // remove todo by ID    [✓]
        // sukses    [✓]
            // if no doc send to 404   [✓]
            // if doc, send to 200   [✓]
        // error
            // empty with body  [✓]
    //~~~~
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((asik) => {
        if(!asik) {
            return res.status(404).send();
        }
        res.send(asik);  // callback jika berhasil
    }).catch((e) => {
        res.status(400).send();
    }); 
});


app.listen(port, () => {
    console.log(`Server running in port ${port}... ASYIK~!`)
});



module.exports = {
    app
};

/**
 * "scripts": {
    "start": "node server/server.js",  /// --- untuk heroku deploy
    "test": "mocha server/**lwjfoldjw
    "test-lihat" : "nodemo,mxcwlkmdkl


    "engines": {
    "node" : "8.11.1"
    },
 */


 /**
  * ~~~~~~~~~~ DEPLOY TO HEROKU APP ~~~~~~~~~~~
  * ~~~MONGODB------
  * $ heroku create ---- menambah aplikasi heroku
  * ~~~~~~ menambah Addon MONGOLAB
  * $ 
  * 
  */