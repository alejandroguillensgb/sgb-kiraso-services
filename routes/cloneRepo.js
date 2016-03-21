var Git = require("nodegit");
var express = require('express');

var router = express.Router();

router.post('/', function(req, res) {
    var data = req.body;
    var path = data.path;
    var repo = data.repo;
    
    if(typeof(path) != "undefined" && typeof(repo) != "undefined")
        Git.Clone(repo, path)
            .then(function(repo){
                res.send("Clone successfull");
            })
            .catch(function(err){
                res.status(500).send("error clonning");
            })
    else
        res.status(400).send("Bad request");
});

module.exports = router;
