var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var Project = require('./schemas/projectSchema');
var router = express.Router();

router.get('/', function(req, res) {

    var app_name = req.query.app;

    Project.find({ _id: app_name }, function(err, elems){
        console.log(app_name);
        console.log(elems);
        if(elems.length != 0){
            var appModel = {
                name: elems[0]._id,
                backgroundImage: elems[0].backgroundImage,
                appLogo: elems[0].appLogo
            };
            res.send(appModel);
        }else{
            res.status(404).send("not found");
        };

    });

});

module.exports = router;