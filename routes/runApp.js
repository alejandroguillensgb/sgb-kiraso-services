var express = require('express');
var fs = require('fs');
var spawn = require('child_process').spawn;

var router = express.Router();

var returnFnc = function(io){

    router.get('/', function(req, res) {

        var path = req.query.path;

        console.log(path);

        var bower = spawn('bower', ['install'], {cwd: path});
        bower.stdout.setEncoding('utf8');
        bower.stdout.on('data', function (data) {
            io.emit("news", data);
        });

        bower.stderr.setEncoding('utf8');
        bower.stderr.on('data', function (data) {
            io.sockets.emit("news", data);
        });

        bower.on('close', function(){
            var build = spawn('gulp', ['serve'], {cwd: path, stdio: [0, 'pipe', 'pipe']});
            build.stdout.setEncoding('utf8');
            build.stdout.on('data', function (data) {
                io.emit("news", data);
            });

            build.stderr.setEncoding('utf8');
            build.stderr.on('data', function (data) {
                io.sockets.emit("news", data);
            });

            res.send(build.pid.toString());    
        });
        

    });
    return router;
};

module.exports = returnFnc;