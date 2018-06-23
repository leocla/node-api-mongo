var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo'); // get todo.js
var {UserData} = require('./models/user'); //get user.js

var app = express();
var port = 3000;

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
         console.log("gagal menyimpan", err);
     });
 });

 // GET DATA
app.get('/todos', (req, res) => {
    Todo.find().then((dataDariMongo) => {
        res.send({
            dataDariMongo
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

app.listen(port, () => {
    console.log(`Server running in port ${port}... ASYIK~!`)
});

module.exports = {
    app
};