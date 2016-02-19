var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var Project = require('./schemas/projectSchema');
var router = express.Router();

router.get('/', function(req, res) {

    var app_name = req.query.app;
    var nodeId = req.query.id;
    var model_type = req.query.type;

    console.log(model_type)

    Project.find({ _id: app_name }, function(err, elems){
        if(elems.length != 0){
            var model = _.find(elems[0].models[model_type], {nodeId: nodeId});
            res.send(model);    
        }else{
            res.status(404).send("not found");
        };

    });

});

module.exports = router;