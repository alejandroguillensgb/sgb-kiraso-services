var fs = require('fs');
var express = require('express');
var mkdirp = require('mkdirp');
var spawn = require('child_process').spawn;
var router = express.Router();

router.put('/', function(req, res) {
    var data = req.body;
    var path = data.path;
    var filename = data.filename;
    var split_filename = filename.split(".");
    var cont = data.cont;

    mkdirp(path, function(err) { 

        try {
            fs.accessSync(path+"/"+filename, fs.F_OK);
        } catch (e) {
            fs.closeSync(fs.openSync(path+"/"+filename, 'w+'));
        };

        console.log(cont);

        fs.writeFileSync(path+"/"+filename, JSON.parse(cont).join('\n'));

        var metadata = spawn("gulp", ["compileMetadata"], {cwd: path});

        metadata.stdout.setEncoding('utf8');    
        metadata.stdout.on('data', function (data) {
          console.log(data)
        });

        metadata.stderr.setEncoding('utf8');
        metadata.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
        });

        metadata.on('exit', function(){
            var data = require(path + "/.tmp/metadata/" + split_filename[0] + ".js");
            delete require.cache[require.resolve(path + "/.tmp/metadata/" + split_filename[0] + ".js")]
            console.log(data)
            res.json(data);
        })

    });

    
});

module.exports = router;
