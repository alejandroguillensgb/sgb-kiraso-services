var express = require('express');
var exec = require('child_process').exec;

var router = express.Router();

router.get('/', function(req, res) {

    if(typeof(req.query.pid) != "undefined"){
        var pid = req.query.pid;
        
        exec("kill " + pid, function(){
            res.send("process killed");
        });
    } else {
        res.status(400).send("Bad request");
    };
    
});

module.exports = router;