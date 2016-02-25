var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var Project = require('./schemas/projectSchema');
var router = express.Router();

router.post('/', function(req, res) {

    var graph = req.body.graph;
    console.log("graph: "+graph);
    var app_name = req.query.app;
    console.log("appname: "+app_name);

    Project.find({_id: app_name}, function(err, elems){
        if(elems.length != 0){

            var updateProject = new Project({ 
                                                _id: elems[0]._id, 
                                                backgroundImage: elems[0].backgroundImage,
                                                appLogo: elems[0].appLogo,
                                                graph: graph
                                            });

            elems[0].remove(function(){
                console.log('remove')
            });

            updateProject.save(function(err, elems){
                console.log(elems);
                console.log('graph updated');
            });
        };  
    });

    res.send();
});

module.exports = router;