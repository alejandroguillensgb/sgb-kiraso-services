var express = require('express');
var mkdirp = require('mkdirp');
var fs = require('fs');
var exec = require('child_process').exec;
var router = express.Router();

router.put('/', function(req, res) {
    var base_path = req.body.base_path;
    var copy_path = req.body.copy_path;
    var app_path = req.body.app_path;

    try {
        fs.accessSync(app_path, fs.F_OK);
        res.send("no copy");
    } catch (e) {
        mkdirp(copy_path, function(err) { 

            exec("cp -r " + base_path + " " + copy_path, function(){
                res.send("copy files");
            });

        });    
    };

    

    
});

module.exports = router;
