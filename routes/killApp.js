var express = require('express');
var exec = require('child_process').exec;
var router = express.Router();

router.get('/', function(req, res) {

    var pid = req.query.pid;

    console.log(pid);
    
    exec("kill " + pid, function(){
        res.send("process killed");
    });

});

module.exports = router;