var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();

router.get('/', function(req, res) {
    
    function dirTree(filename) {

        var stats = fs.lstatSync(filename),
            info = {
                path: filename,
                text: path.basename(filename)
            };

        if (stats.isDirectory()) {
            info.type = "folder";
            info.submenu = fs.readdirSync(filename).map(function(child) {
                return dirTree(filename + '/' + child);
            });
        } else {
            info.type = "file";
        }

        return info;
    };

    if(typeof(req.query.path) != "undefined"){
        var my_path = req.query.path;
        res.json([dirTree(my_path)])
    } else {
        res.status(400).send("Bad request");
    };
        
});

module.exports = router;