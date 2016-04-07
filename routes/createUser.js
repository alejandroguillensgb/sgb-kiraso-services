var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var User = require('./schemas/userSchema');

var router = express.Router();

router.post('/', function(req, res) {

    var body = req.body;
    var username = body.username.toLowerCase();

    User.find({_id: username}, function(err, elems){
        if(typeof(elems) == "undefined" || elems.length == 0 ){
            var newUser = new User({ _id: username,
                                     password: body.password,
                                     projects: [] });
            newUser.save(function(err, elem){
                res.send("User added");
            });
        } else {
            res.status(400).send('User already exists');
        };
    });
    
});

module.exports = router;