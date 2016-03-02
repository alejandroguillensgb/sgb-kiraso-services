var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var Project = require('./schemas/projectSchema');
var User = require('./schemas/userSchema');
var router = express.Router();

router.delete('/', function(req, res) {

    var app_name = req.query.app;
    var username = req.query.username;
    Project.find({ _id: app_name }, function(err, elems){
        if(elems.length != 0){
            elems[0].remove(function(){
                User.find({_id: username}, function(err, elems){
                    if(elems.length != 0){
                        var projects = _.filter(elems[0].projects, function(e){
                                                                                return e != app_name
                                                                            });
                        var updateUser = new User({
                                                    _id: elems[0]._id,
                                                    password: elems[0].password,
                                                    projects: projects
                                                });
                        elems[0].remove(function(){
                            updateUser.save(function(){
                                res.send("username updated");
                            })    
                        });
                        
                    } else {
                        res.status(404).send("not found");
                    }
                })
            });             
        }else{
            res.status(404).send("not found");
        };
    });

});

module.exports = router;