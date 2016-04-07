var fs = require('fs');
var express = require('express');
var mkdirp = require('mkdirp');
var _ = require('lodash');

var router = express.Router();

router.put('/', function(req, res) {
    var data = req.body;
    var path = data.path;
    var filename = data.filename;
    var cont = data.cont;

    mkdirp(path, function(err) { 
        var data;
        try {
            fs.accessSync(path+"/"+filename, fs.F_OK);
            data = JSON.parse(fs.readFileSync(path+"/"+filename));
        } catch (e) {
            fs.closeSync(fs.openSync(path+"/"+filename, 'w+'));
            data = [];
        };
        
        if(!_.find(data, JSON.parse(cont)))
            data.push(JSON.parse(cont))
        
        fs.writeFileSync(path+"/"+filename, JSON.stringify(data));

        res.send(cont);

    });

    
});

module.exports = router;
