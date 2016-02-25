var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');
var Project = require('./schemas/projectSchema');
var User = require('./schemas/userSchema');
var _ = require('lodash');
var router = express.Router();

router.put('/', function(req, res) {

    var username = req.body.username;
    var old_name = req.body.old_name;
    var model = req.body.model;
    
    User.find({_id: username}, function(err, userElems){
        console.log("params")
        console.log(username)
        console.log(old_name)
        console.log(model)
        console.log("user elems")
        console.log(userElems[0].projects)
        _.remove(userElems[0].projects, function(elem){
            console.log(elem)
            return elem == old_name;
        });
        console.log(userElems[0].projects);
        userElems[0].projects.push(model.name);
        console.log(userElems[0].projects);
        var updateUser = new User({
                                    _id: userElems[0]._id,
                                    password: userElems[0].password,
                                    projects: userElems[0].projects
                                    });
        userElems[0].remove(function(){
            updateUser.save(function(){
                Project.find({_id: old_name}, function(err, projectElem){
                    var updateProject = new Project({
                                                     _id: model.name,
                                                     backgroundImage: model.backgroundImage,
                                                     appLogo: model.appLogo,
                                                     graph: projectElem[0].graph
                                                    });
                    console.log("project")
                    console.log(projectElem[0])
                    console.log("delete project")
                    projectElem[0].remove(function(){
                        console.log("remove project");
                        updateProject.save(function(err, elem){
                            console.log(elem);
                            console.log("project updated");
                            res.send();
                        })
                    })
                });
            });
        });
        

    });

    
});

module.exports = router;