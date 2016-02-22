var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var Project = require('./schemas/projectSchema');
var router = express.Router();

router.get('/', function(req, res) {

    var app_name = req.query.app;

    console.log(app_name)

    Project.find({ _id: app_name }, function(err, elems){
        console.log(elems.length)
        if(typeof(elems)!="undefined" || elems.length > 0 ){
            console.log(elems);
            console.log(elems[0].graph);
            res.send(elems[0].graph);
        } else{
            res.status(404).send("project not found");
        };
        
    });

});

module.exports = router;