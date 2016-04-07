

var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports = function(io) {
    eventEmitter.on('doorOpen', function(){console.log("RINGGG")});

    io.sockets.on('connection', function (socket) {
     
            socket.emit('news', "wwwwwwwww");

    });
};