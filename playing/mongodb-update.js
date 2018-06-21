const {MongoClient, ObjectID} = require('mongodb');
// harus~!!!  ObjectID .... tidak bisa lainnya... misal objekID --- RA ISO

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
    if(err){
        return console.log('gagal terkoneksi ke Server MongoDB~!');
    }

    console.log('Selamat~!... anda telah tersambung ke MongoDB server');
    console.log(" -------- UPDATE DATA -------------- ");
    const db = client.db('TodoApp');    

    /**
     * MAKSUDE APA JAL? 
     * returnOriginal???
     */
    db.collection('Todos').findOneAndUpdate({
        _id : new ObjectID('5b2b13cc70330662685c1c6a')
    }, {
        $set : {
            completed: true
        }
    }, {
        returnOriginal : false
    }).then((hasil) => {
        console.log(hasil);
    });

    client.close(); // untuk keluar jika sudah selesai
});

