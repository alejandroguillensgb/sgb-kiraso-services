var assert = require('assert');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/kiraso';

router.get('/', function(req, res) {

    var collection = req.query.collection;
    var node_id = req.query.node_id;
    var data;

    console.log(collection);
    console.log(node_id);

    var findModels = function(db, callback){
        var cursor = db.collection(collection).find({"node_id" : node_id});
        cursor.each(function(err,doc){
            if (doc != null){
                res.send(doc);
            } else {
                callback();
            };
        });
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findModels(db, function() {
            db.close();
        });
    });
});

module.exports = router;