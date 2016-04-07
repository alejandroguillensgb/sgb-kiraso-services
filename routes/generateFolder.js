var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var exec = require('child_process').execSync;

var router = express.Router();

router.get('/', function(req, res) {

    if(req.query.path != "undefined"){
        var path = req.query.path;
        var split = path.split("/");
        var init_path = _.initial(split).join("/");
        var last = _.last(split);

        fs.access(path, fs.F_OK, function(err) {
            if (!err) {
                exec("cd " + init_path + " && tar -cvf " + last + ".tar " + last);
                res.setHeader('Content-Type', 'application/x-tar');
                res.sendFile(path + ".tar");
            } else {
                res.status(404).send("Path not found");
            }
        });
    } else {
        res.status(400).send("Bad request");
    };
    

});

module.exports = router;