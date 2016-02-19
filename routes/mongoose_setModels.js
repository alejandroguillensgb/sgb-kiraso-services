var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var Project = require('./schemas/projectSchema');
var router = express.Router();

router.post('/', function(req, res) {

    var model_type = req.body.model_type;
    var model = req.body.model;
    var app_name = req.query.app;
    console.log(app_name);
    var updateModels;

    Project.find({_id: app_name}, function(err, elems){
        if(elems.length != 0 && model_type!="event"){
            var same_id_models = _.filter(elems[0].models[model_type], {nodeId: model.nodeId});

            if(same_id_models.length != 0){
                _.remove(elems[0].models[model_type], { nodeId: model.nodeId});
            };
            elems[0].models[model_type].push(model);

            var updateProject = new Project({ 
                                                _id: elems[0]._id, 
                                                backgroundImage: elems[0].backgroundImage,
                                                appLogo: elems[0].appLogo,
                                                models:{data: elems[0].models['data'],
                                                        screen: elems[0].models['screen'],
                                                        params: elems[0].models['params'],
                                                        event: elems[0].models['event']},
                                                graph: elems[0].graph
                                            });

            elems[0].remove(function(){
                console.log('remove')
            });

            updateProject.save(function(err, elems){
                console.log('model updated');
            });
        };  
    });

    Project.find({ _id: app_name }, function(err, elems){
        console.log(elems[0].models[model_type])
    });

    res.send();
});

module.exports = router;