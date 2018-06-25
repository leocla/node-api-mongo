var env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if(env === 'development'){
    process.env.PORT = 4000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAplikasi';
    //process.env.MONGODB_URI = 'mongodb://tono:tono1234@ds117431.mlab.com:17431/node-api-mongodb';
} else if(env === 'test'){
    process.env.PORT = 4000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAplikasiTesting';
}

//``````INI YANG SALAH

// var env = process.env.NODE_ENV || 'development';
// console.log('env ******', env);

// if (env === 'development') {   // untuk LOKAL
//     process.env.PORT = 4000;
//     process.env.MONGOBD_URI = 'mongodb://localhost:27017/TodoAplikasi'; /// G*MBL*NK ------> mongobd?.... sing bener MONGODB
// } else if (env === 'test') {
//     process.env.PORT = 4000;
//     process.env.MONGOBD_URI = 'mongodb://localhost:27017/TodoAplikasiTesting';
// } 

