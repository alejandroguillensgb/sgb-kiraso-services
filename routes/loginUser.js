var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var User = require('./schemas/userSchema');
var router = express.Router();

router.post('/', function(req, res) {

    var body = req.body;
    var username = body.username.toLowerCase();
    User.find({_id: username}, function(err, elems){
        console.log(elems);
        if( elems.length != 0 ){
            console.log(elems[0].password)
            console.log(body.password)
            if(elems[0].password == body.password){
                var resObj = {
                    username: elems[0]._id,
                    projects: elems[0].projects
                }
                res.json(resObj);
            } else {
                res.status(400).send("incorrect password");
            };
        } else {
            res.status(400).send("wrong username or password");
        };
    });
});

module.exports = router;