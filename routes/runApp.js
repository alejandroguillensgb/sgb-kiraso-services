var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');
var spawn = require('child_process').spawn;
var router = express.Router();

router.get('/', function(req, res) {

    var path = req.query.path;

    console.log(path);
    
    var npm = spawn('npm', ['install'], {cwd: path});
    npm.stdout.setEncoding('utf8');
    npm.stdout.on('data', function (data) {
      console.log(data)
    });

    npm.stderr.setEncoding('utf8');
    npm.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    npm.on('close', function(){
        var serve = spawn("gulp", ["serve"], { cwd: path });

        serve.stdout.setEncoding('utf8');    
        serve.stdout.on('data', function (data) {
          console.log(data)
        });

        serve.stderr.setEncoding('utf8');
        serve.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
        });

        res.send(serve.pid.toString());
    });

    

});

module.exports = router;