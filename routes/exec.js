var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');
var spawn = require('child_process').spawn;
var exec = require('child_process').execSync;
var router = express.Router();

var returnFnc = function(io){

    router.get('/', function(req, res) {

        // var path = req.query.path;

        // console.log(path);

        // console.log(io)

        // fs.readdir(path, function(err){
        //     if(err){
        //         mkdirp.sync(path);
        //         var split_path = path.split("/");

        //         var gen = spawn('yo', ['megazord', split_path[split_path.length-1]], {cwd: path});

        //         gen.stdout.setEncoding('utf8');    
        //         gen.stdout.on('data', function (data) {
        //             io.sockets.emit("news", data);
        //         });

        //         gen.stderr.setEncoding('utf8');
        //         gen.stderr.on('data', function (data) {
        //             io.sockets.emit("news", data);
        //         });

        //         gen.on("close", function(){
        //             fs.readdir(path + "_tmp", function(err, files){
        //                 if(!err){
        //                     for(var i = 0; i < files.length; i++){
        //                         console.log(files[i]);
        //                         exec("mv " + path + "_tmp/" + files[i] + " " + path)
        //                     };

        //                     var npm = spawn('npm', ['install'], {cwd: path});
        //                     npm.stdout.setEncoding('utf8');
        //                     npm.stdout.on('data', function (data) {
        //                         io.sockets.emit("news", data);
        //                     });

        //                     npm.stderr.setEncoding('utf8');
        //                     npm.stderr.on('data', function (data) {
        //                         io.sockets.emit("news", data);
        //                     });

        //                     npm.on('close', function(){
        //                         res.send("finish")      
        //                     });
        //                 };
        //             });
        //         });    
        //     } else {
        //         var aux;
        //         fs.readdir(path + "_tmp", function(err, files){
        //             if(!err){
        //                 for(var i = 0; i < files.length; i++){
        //                     console.log(files[i])
        //                     if(files[i] == "screens"){
        //                         aux = files[i];
        //                         fs.readdir(path + "_tmp/" + files[i], function(err,fil){
        //                             if(!err){
        //                                 mkdirp(path + "/screens", function(err) {
        //                                     for(var j = 0; j < fil.length; j++){
        //                                         exec("mv " + path + "_tmp/" + aux + "/"+ fil[j] + " " + path + "/screens")
        //                                     }

        //                                 });    
                                        
        //                             }
        //                         })
        //                     } else {
        //                         exec("mv " + path + "_tmp/" + files[i] + " " + path)
        //                     }
        //                 };

        //                 var npm = spawn('npm', ['install'], {cwd: path});
        //                 npm.stdout.setEncoding('utf8');
        //                 npm.stdout.on('data', function (data) {
        //                     io.sockets.emit("news", data);
        //                 });

        //                 npm.stderr.setEncoding('utf8');
        //                 npm.stderr.on('data', function (data) {
        //                     io.sockets.emit("news", data);
        //                 });

        //                 npm.on('close', function(){
        //                     res.send("finish")    
        //                 });
        //             };
        //         });
        //     }; 
        // });

        var path = req.query.path;

        console.log(path);

        console.log(io)

        fs.readdir(path, function(err){
            if(err){
                mkdirp.sync(path);
                var split_path = path.split("/");

                var gen = spawn('yo', ['megazord', split_path[split_path.length-1]], {cwd: path});

                gen.stdout.setEncoding('utf8');    
                gen.stdout.on('data', function (data) {
                    io.sockets.emit("news", data);
                });

                gen.stderr.setEncoding('utf8');
                gen.stderr.on('data', function (data) {
                    io.sockets.emit("news", data);
                });

                gen.on("close", function(){
                    fs.readdir(path + "_tmp", function(err, files){
                        if(!err){
                            for(var i = 0; i < files.length; i++){
                                console.log(files[i]);
                                exec("mv " + path + "_tmp/" + files[i] + " " + path)
                            };

                            exec("ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git", {cwd:path});

                            var build = spawn('gulp', ['build'], {cwd: path, stdio: [0, 'pipe', 'pipe']});
                            build.stdout.setEncoding('utf8');
                            build.stdout.on('data', function (data) {
                                io.sockets.emit("news", data);
                            });

                            build.stderr.setEncoding('utf8');
                            build.stderr.on('data', function (data) {
                                io.sockets.emit("news", data);
                            });

                            build.on('close', function(){
                                res.send("finish")      
                            });
                        };
                    });
                });    
            } else {
                var aux;
                fs.readdir(path + "_tmp", function(err, files){
                    if(!err){
                        for(var i = 0; i < files.length; i++){
                            console.log(files[i])
                            if(files[i] == "screens"){
                                aux = files[i];
                                fs.readdir(path + "_tmp/" + files[i], function(err,fil){
                                    if(!err){
                                        mkdirp(path + "/screens", function(err) {
                                            for(var j = 0; j < fil.length; j++){
                                                exec("mv " + path + "_tmp/" + aux + "/"+ fil[j] + " " + path + "/screens")
                                            }

                                        });    
                                        
                                    }
                                })
                            } else {
                                exec("mv " + path + "_tmp/" + files[i] + " " + path)
                            }
                        };

                        var build = spawn('gulp', ['build'], {cwd: path, stdio: [0, 'pipe', 'pipe']});
                        build.stdout.setEncoding('utf8');
                        build.stdout.on('data', function (data) {
                            io.sockets.emit("news", data);
                        });

                        build.stderr.setEncoding('utf8');
                        build.stderr.on('data', function (data) {
                            io.sockets.emit("news", data);
                        });

                        build.on('exit', function(){
                            console.log("exit")
                            res.send("finish")
                        });

                        build.on("error", function(){
                            console.log("build error")
                        })
                    };
                });
            }; 
        });

    });
    return router;
}

module.exports = returnFnc;