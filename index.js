'use strict'
var app = require('./app');
let config = require('./config/general.config')
require('./db')


var http = require('http').Server(app);
var responseCodes = require('./helpers/respoonse_codes.helper')

var io = require('socket.io')(http);


app.set('socketio', io);
io.on('connection', function (socket) {
    console.log('conectado')
})

app.use(async (req, res) => {
    let response = await responseCodes.getErrorByCode(404);
    res.status(404).json(response)
})

http.listen(config.app_port, function () {
    console.log('Server is run correct port:' + config.app_port);
});


