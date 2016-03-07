var Git = require("nodegit");
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    var data = req.body;
    var path = data.path;
    var repo = data.repo;
    
    Git.Clone(repo, path)
        .then(function(repo){
            res.send("clone successfull");
        })
        .catch(function(err){
            res.status(500).send("error clonning");
        })

});

module.exports = router;
