'use strict'
var mongoose = require('mongoose');
let config = require('./config/general.config')
let URI = '';

if (config.environment == 'PRODUCTION') {
    URI = 'mongodb://' + config.db_user + ':' + config.db_password + '@' + config.db_host + ':' + config.db_port + '/' + config.db_name;
} else {
    URI = 'mongodb://' + config.db_host + ':' + config.db_port + '/' + config.db_name;
}

console.log(config)

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(error => console.error(error));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = mongoose;
