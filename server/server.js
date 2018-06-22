var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo'); // get todo.js
var {User} = require('./models/user'); //get user.js

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
    var post_hasil = req.body;
    console.log(JSON.stringify(post_hasil, undefined, 2));

    //memasukan ke dalam mongo db
    var todo = new Todo({  /// Todo (T besar...) --> sudah dideklarasikan
        text : req.body.text
    });

    // simpan ke dalam database
    todo.save().then((dokumen) => {
        res.send(dokumen);
    }, (err) => {
        res.status(400).send(err);
        console.log('Gagal menyimpan database', err);
    });
 });


app.listen(port, () => {
    console.log(`Server running in port ${port}... ASYIK~!`)
});