var exec = require('child_process').exec;
var fs = require('fs');
var express = require('express');
var router = express.Router();

router.delete('/', function(req, res) {
    var path = req.query.path;

    exec("rm -rf " + path, function(){
        console.log("clear directory");
    });

    exec("rm -rf " + path + "_tmp", function(){
        console.log("clear directory");
    });

    res.send();
});


module.exports = router;
