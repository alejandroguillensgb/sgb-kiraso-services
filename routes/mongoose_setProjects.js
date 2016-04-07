var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var User = require('./schemas/userSchema');

var router = express.Router();

router.post('/', function(req, res) {

    var project = req.body.project;
    console.log("project "+ project);
    var username = req.body.username;
    console.log("username "+ username);
    console.log(typeof(username));

    if(typeof(username)!="string" || typeof(project) != "string"){
        console.log("entre");
        res.status(400).send("bad request");
    } else{
        User.find({_id: username}, function(err, elems){
            console.log("hice esto")
            console.log(elems);
            if(elems.length != 0){
                var same_projects = _.filter(elems[0].projects, function(item){
                    return item == project;
                });
                if(same_projects == 0) {
                    elems[0].projects.push(project);
                    var updateUser = new User({ 
                                                _id: elems[0]._id, 
                                                password: elems[0].password,
                                                intern: elems[0].intern,
                                                projects: elems[0].projects
                                            });

                    elems[0].remove(function(){
                        console.log('remove')
                        updateUser.save(function(err, elems){
                            console.log('user updated');
                            res.send();
                        });
                    });
                }else{
                    res.status(400).send("Project already exists");
                };
            };  
        });
    }; 
});

module.exports = router;