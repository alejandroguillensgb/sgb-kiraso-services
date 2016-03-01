var fs = require('fs');
var express = require('express');
var mkdirp = require('mkdirp');
var router = express.Router();

router.put('/', function(req, res) {
    var data = req.body;
    var path = data.path;
    var filename = data.filename;
    var cont = data.cont;

    mkdirp(path, function(err) { 

        try {
            fs.accessSync(path+"/"+filename, fs.F_OK);
        } catch (e) {
            fs.closeSync(fs.openSync(path+"/"+filename, 'w+'));
        };

        fs.writeFileSync(path+"/"+filename, JSON.parse(cont).join('\n'));
        res.send("Data saved: " + cont);

    });

    
});

module.exports = router;
