var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var Project = require('./schemas/projectSchema');
var router = express.Router();

router.get('/', function(req, res) {

    var app_name = req.query.app;

    Project.find({ _id: app_name }, function(err, elems){
        console.log(elems);
        console.log(elems[0].graph);
        res.send(elems[0].graph);
    });

});

module.exports = router;