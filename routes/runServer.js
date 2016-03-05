var express = require('express');
var fs = require('fs');
var spawn = require('child_process').spawn;
var router = express.Router();

router.get('/', function(req, res) {

    var serve = spawn('ionic', ['serve', '-b'], {cwd: '/home/alejandro/testApp'});
    
    serve.stdout.on('data', function (data) {
      console.log("io")
    });

    serve.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    serve.on('exit', function (code) {
      console.log('child process exited with code ' + code);
    });

    res.send(serve.pid.toString())

});

module.exports = router;