//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var objek = new ObjectID(); // create random objek ID
console.log(objek); /// print objek id

//using ES6
// var user = {nama: 'Paijo', umur: 20};
// var {nama} = user;
// console.log(nama);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
    if(err){
        return console.log('gagal terkoneksi ke Server MongoDB~!');
    }

    console.log('Horeee... anda telah tersambung ke MongoDB server');
    const db = client.db('TodoApp');

    /*
    db.collection('Todos').insertOne({
        teks : 'Ada sesuatu disini...Hahaha',
        completed: false
    }, (err, result) => {
        if (err){
            return console.log('gagal untuk menyimpan data', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    }) */

    /*
    db.collection('Users').insertOne({
        //_id: 12,
        nama: "SuTonoV",
        umur: 30,
        lokasi: "Bogor"
    }, (err, hasil) => {
        if(err){
            return console.log('Gagal menyimpan data', err);
        }

        console.log('Data berhasil dimasukan ___');
        console.log(JSON.stringify(hasil.ops, undefined, 2));
        console.log(hasil.ops[0]._id.getTimestamp()); // get waktu 
    });
    */

    client.close();
    // db.close(); /// DEPRECREATED // v2
});


/**
 * ------------ // INSTALL MONGO NPM
 * 
 * 
 * MENJALANKAN MONGOD.exe
 * ----------------------
 * $ mongod.exe --dbpath /Users/BebekDev/mongo-data
 * 
 * --------- // MENJALANKAN MONGO.exe
 * $ mongo.exe
 * 
 * 
 * mongoDB akan membuat ID otomatis...
 * tetapi jika membuat ID manual juga bisa kok hahahhaa
 */

