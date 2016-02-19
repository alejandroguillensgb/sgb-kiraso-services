var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var Project = require('./schemas/projectSchema');
var router = express.Router();

router.post('/', function(req, res) {

    var body = req.body;
    
    var newProject = new Project({ _id: body.name, 
                                    backgroundImage: body.backgroundImage,
                                    appLogo: body.appLogo,
                                    graph: JSON.stringify({"nodes": [], "edges": []})
                                });

    Project.find({_id: body.name}, function(err, elems){
        console.log(elems);
        if(typeof(elems)=="undefined" || elems.length == 0){
            newProject.save(function(){
                console.log('added');
            });
        } else {
            Project.update({_id: body.name}, {backgroundImage: body.backgroundImage,
                                    appLogo: body.appLogo}, function(){
                                        console.log('updated');
                                    });
        };
    });

    Project.find(function(err, elems){
        console.log(elems);
    });

    res.send();
});

module.exports = router;