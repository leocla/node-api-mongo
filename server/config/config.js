var env = process.env.NODE_ENV || 'development';

/**
 * tambahan 
 * UPDATE CONFIG
 * adding to .gitignore --- harusnya  
 */

 if (env === 'development' || env === 'test'){
    // get from file config.json
    var config = require('./config.json');
    console.log(JSON.stringify(config, undefined,2));
    var envKonfig = config[env];

    console.log(Object.keys(envKonfig));
    Object.keys(envKonfig).forEach((key) => {
      process.env[key] = envKonfig[key];
      console.log(process.env[key]);
    })
 }


 /**
  * yang lama ini
  */
// if (env === 'development') {
//   process.env.PORT = 4000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//   process.env.PORT = 4000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }

/**
 * manage lokal environment
 * 
 */


 /**
  * KONFIGURASI PADA HEROKU
  * ~~~~~~~~~~~~~~~~~~~~~~~
  * $ heroku config
  * $ heroku config:set NAME=Tono
  * $ heroku config 
  * $ heroku config:get NAME
  * $ heroku config:unset NAME
  * 
  * ~~~~~~~~~~~~~~~~~~~~~~
  * $ heroku config:get MONGODB_URI
  */