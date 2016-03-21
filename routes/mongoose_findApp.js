var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var Project = require('./schemas/projectSchema');

var router = express.Router();

router.get('/', function(req, res) {

    if(req.query.app != "undefined"){
        var app_name = req.query.app;
        Project.find({ _id: app_name }, function(err, elems){
            console.log(app_name);
            console.log(elems);
            if(elems.length != 0){
                var appModel = {
                    name: elems[0]._id
                };
                res.send(appModel);
            }else{
                res.status(404).send("App not found");
            };
        });
    } else {
        res.status(400).send("Bad request");
    };    
});

module.exports = router;