var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
/**
 * LOKAL DEPLOYMENT
 */

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoAplikasi');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://tono:tono1234@ds117431.mlab.com:17431/node-api-mongodb');

/**
 * MENGAMBIL DATABASE dari MLAB
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * mongodb://<dbuser>:<dbpassword>@ds117431.mlab.com:17431/node-api-mongodb
 * ini memakai AWS looo... (US-Virginia)
 */
//mongoose.connect('mongodb://tono:tono1234@ds117431.mlab.com:17431/node-api-mongodb');

module.exports = {
    mongoose
};

//process.env.NODE_ENV === 'production'

/**
 * ~~~~~~~~ ada 3 env ~~~~~~~~~~~~~~~~~~~
 * 1. production     --- IN HEROKU
 * 2. development    --- IN LOCAL
 * 3. testing        --- RUN IN MOCHA.js
 */


 /**
  * ~~~~~~~ in package.json ~~~~~~~~~~~~~
  * pada "test"
  * untuk linux --- export NODE_ENV=test
  * untuk windows --- SET \"NODE_ENV=test\"
  */