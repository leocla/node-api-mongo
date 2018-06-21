const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
    if(err){
        return console.log('gagal terkoneksi ke Server MongoDB~!');
    }

    console.log('Selamat~!... anda telah tersambung ke MongoDB server');
    console.log('/// DELETE DATA ///');
    const db = client.db('TodoApp');    

   /**
    * DELETE USING _ID
    */
    db.collection('Users').findOneAndDelete({ 
        _id: new ObjectID('5b2b5ade51ec2f5020267732')
    }).then((hasil) => {
       console.log(JSON.stringify(hasil, undefined, 2)); 
    });

    // db.collection('Users').deleteMany({nama: "SuTonoV"}).then((result) => {
    //     console.log(result);
    // });
    
    // menghapus tanpa result... wkwkwk ... PAKAI DI BAWAH INI
    // tanpa menggunakan CALLBACK
   // db.collection('Users').deleteMany({nama: "SuTonoV"});

    client.close(); // untuk keluar jika sudah selesai
});

