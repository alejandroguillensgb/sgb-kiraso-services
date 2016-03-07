var fs = require('fs');
var express = require('express');
var mkdirp = require('mkdirp');
var spawn = require('child_process').spawn;
var router = express.Router();

router.put('/', function(req, res) {
    var data = req.body;
    var path = data.path;
    var split_path = path.split("/");
    var filename = data.filename;
    var split_filename = filename.split(".");
    var cont = data.cont;
    var screens_path = data.screens_path;

    mkdirp(path, function(err) { 

        try {
            fs.accessSync(path+"/"+filename, fs.F_OK);
        } catch (e) {
            fs.closeSync(fs.openSync(path+"/"+filename, 'w+'));
        };

        console.log(cont);

        fs.writeFileSync(path+"/"+filename, JSON.parse(cont).join('\n'));

        var screen_name = split_path[split_path.indexOf("screens")+1];

        try {
            fs.accessSync(screens_path+"/"+screen_name+"/"+filename, fs.F_OK);
        } catch (e) {
            fs.closeSync(fs.openSync(path+"/"+filename, 'w+'));
        };       

        fs.writeFileSync(screens_path+"/"+screen_name+"/"+filename, JSON.parse(cont).join('\n')); 

    });

    
});

module.exports = router;
