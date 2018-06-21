const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
    if(err){
        return console.log('gagal terkoneksi ke Server MongoDB~!');
    }

    console.log('Selamat~!... anda telah tersambung ke MongoDB server');
    console.log('/// DELETE DATA ///');
    const db = client.db('TodoApp');    

    /// DELETING [MANY DATA]
    /*
    db.collection('Todos').deleteMany({teks: "mangan tahu bakso"}).then((result) => {
        console.log(result);
        console.log('BERHASIL MENGHAPUS~!');
    });
    */

    /**
     * nama collection pada mongoDB case sensitive....
     * $$$ Todos X TOdOs .... tidak sama dengan ternyata
     * $$$ deleteOne ---> akan menghapus dari data yang awal... jika ada yang sama
     */
    // DELETE ONE //// 
    // db.collection('TOdOs').deleteOne({teks: "aku mangan telo"}).then((hasil) => {
    //     console.log(hasil);
    // });

    /* 
    db.collection('Todos').deleteOne({teks: "aku mangan telo"}).then((hasil) => {
        console.log(hasil);
    }, (err) => { // akan masuk error JIKA SERVER TIDAK NYALA
        return console.log('Gagal menghapus DATA... server mongo tidak terhubung', err);
    }); */

    /// FIND ONE and DELETE... hahaha.. jangan dibalik... tidak jadi nanti
    /// $$ menghapus dari nomor data yang paling atas
    db.collection('Todos').findOneAndDelete({completed : true }).then((hasil) => {
       console.log(hasil); 
    });
    

    client.close(); // untuk keluar jika sudah selesai
});

