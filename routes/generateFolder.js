var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var exec = require('child_process').exec;
var router = express.Router();

router.get('/', function(req, res) {
    var path = req.query.path;
    var split = path.split("/");
    var init_path = _.initial(split).join("/");
    var last = _.last(split);
    exec("cd " + init_path + " && tar -cvf " + last + ".tar " + last, function(err, stdout){
        //res.send();
        res.sendFile(path + ".tar")
    });

});

module.exports = router;