var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var Project = require('./schemas/projectSchema');

var router = express.Router();

router.post('/', function(req, res) {

    var body = req.body;
    
    var newProject = new Project({ _id: body.name,
                                    graph: JSON.stringify({"nodes": [], "edges": []})
                                });

    Project.find({_id: body.name}, function(err, elems){
        console.log("DEBUG")
        console.log(elems);
        if(typeof(elems)=="undefined" || elems.length == 0){
            newProject.save(function(){
                console.log('added');
                res.send("Project saved");
            });
        } else {
            Project.update({_id: body.name}, {_id: body.name}, function(){
                                        console.log('updated');
                                    });
            res.status(400).send("Bad request");
        };
    });

    
});

module.exports = router;