var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var Project = require('./schemas/projectSchema');
var router = express.Router();

router.delete('/', function(req, res) {

    var app_name = req.query.app;
    var elementId = req.query.id;

    Project.find({ _id: app_name }, function(err, elems){
        console.log(app_name);
        console.log(elementId);
        console.log(elems);
        if(elems.length != 0){
            _.remove(elems[0].models['data'], {elementId: elementId});
            _.remove(elems[0].models['params'], {elementId: elementId});
            _.remove(elems[0].models['screen'], {elementId: elementId});
            _.remove(elems[0].models['event'], function(elem){
                return elem.elementId.split("-")[0] == elementId || elem.elementId.split("-")[1] == elementId;
            });
            var graph = JSON.parse(elems[0].graph);
            _.remove(graph.nodes, function(elem){
                return elem.id == elementId;
            });
            _.remove(graph.edges, function(elem){
                return elem.source == elementId || elem.target == elementId;
            });
            
            var updateProject = new Project({ 
                                                _id: elems[0]._id, 
                                                backgroundImage: elems[0].backgroundImage,
                                                appLogo: elems[0].appLogo,
                                                models:{data: elems[0].models['data'],
                                                        screen: elems[0].models['screen'],
                                                        params: elems[0].models['params'],
                                                        event: elems[0].models['event']},
                                                graph: JSON.stringify(graph)
                                            });

            elems[0].remove(function(){
                console.log('remove')
            });

            updateProject.save(function(err, elems){
                console.log('model updated');
            });
             
        }else{
            res.status(404).send("not found");
        };
    });

});

module.exports = router;