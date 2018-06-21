const {MongoClient, ObjectID} = require('mongodb');

/*
var objek = new ObjectID(); // create random objek ID
console.log(objek); /// print objek id
*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
    if(err){
        return console.log('gagal terkoneksi ke Server MongoDB~!');
    }

    console.log('Selamat~!... anda telah tersambung ke MongoDB server');
    const db = client.db('TodoApp');
    
    // MENGHITUNG JUMLAH DATA DALAM DATABASE
    /// nama collection CASE SENSITIVE... huruf besar dan kecil beda
    db.collection('Todos').find({}).count().then((counter) => {
        console.log(`Hasil perhitungan data sebanyak ${counter}`);
    }, (err) => { // akan masuk jika mongoDB server mati
        console.log('Gagal mengambil data dari SERVER... HAHAHA');
    });

    

    db.collection('Users').find({nama: "TonoA"}).toArray().then((hasil) => {
        console.log(JSON.stringify(hasil, undefined, 2));
    }, (err) => {
        console.log('failed');
    });
    

    /*
    // FILTERING 

    // 3 : (ketiga)
    db.collection('Todos').find({
        _id: new ObjectID('5b2b13f82cfda257701cc803') // kalo begini bisa brooo
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Gagal mengambil data dari Server', err);
    }); */

    // 2 : (kedua)

    // tidak bisa karena _id bukan string... tapi objectID
    /*
    db.collection('Todos').find({_id: '5b2b13f82cfda257701cc803'}).toArray().then((docs) => {
        console.log('Todos');

        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Gagal mengambil data dari Server', err);
    }); */

    // 1 : (pertama)
    /*
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        //console.log(JSON.stringify(docs, undefined, 3));
        console.log(JSON.stringify(docs, undefined, 2));
        // undefined -- for filter function
        // 2 -- for spacing
    }, (err) => {
        console.log('Gagal mengambil data dari Server', err);
    });
    */

   client.close();
});

