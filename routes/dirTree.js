var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res) {
    
    var my_path = req.query.path;

    function dirTree(filename) {

        var stats = fs.lstatSync(filename),
            info = {
                path: filename,
                text: path.basename(filename)
            };

        if (stats.isDirectory()) {
            info.type = "folder";
            info.icon = "icon-folder"
            info.submenu = fs.readdirSync(filename).map(function(child) {
                return dirTree(filename + '/' + child);
            });
        } else {
            // Assuming it's a file. In real life it could be a symlink or
            // something else!
            info.type = "file";
            info.icon = "fa fa-file-o"
        }

        return info;
    };

    res.json([dirTree(my_path)])
    
});

module.exports = router;