var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var User = require('./schemas/userSchema');
var Project = require('./schemas/projectSchema');
var router = express.Router();

router.get('/', function(req, res) {

    User.remove({}, function(){
        console.log('User removed')
    });

    Project.remove({}, function(){
        console.log('Project removed')
    });

    res.send('dropped');
});

module.exports = router;