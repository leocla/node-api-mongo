var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
/**
 * LOKAL DEPLOYMENT
 */

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoAplikasi');

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