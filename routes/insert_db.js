var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var router = express.Router();
var url = 'mongodb://localhost:27017/test';
var ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res) {
    // var collection = req.query.collection;
    // var updateModels = function(db, callback) {
    //     db.collection(collection).replaceOne({"restaurant_id" : "0"}, {
    //         "address" : {
    //             "street" : "2 Avenue",
    //             "zipcode" : "10075",
    //             "building" : "1480",
    //             "coord" : [ -73.9557413, 40.7720266 ]
    //         },
    //         "borough" : "Manhattan",
    //         "cuisine" : "Italian",
    //         "grades" : [
    //             {
    //                 "date" : new Date("2014-10-01T00:00:00Z"),
    //                 "grade" : "A",
    //                 "score" : 11
    //             },
    //             {
    //                 "date" : new Date("2014-01-16T00:00:00Z"),
    //                 "grade" : "B",
    //                 "score" : 17
    //             }
    //         ],
    //         "name" : "Vella",
    //         "restaurant_id" : "1"
    //     }, function(err, result) {
    //         assert.equal(err, null);
    //         console.log("Updated a document into a collection.");
    //         callback(result);
    //     });
    // };
    // var insertModels = function(db, callback) {
    //     db.collection(collection).insertOne( {
    //         "address" : {
    //             "street" : "2 Avenue",
    //             "zipcode" : "10075",
    //             "building" : "1480",
    //             "coord" : [ -73.9557413, 40.7720266 ]
    //         },
    //         "borough" : "Manhattan",
    //         "cuisine" : "Italian",
    //         "grades" : [
    //             {
    //                 "date" : new Date("2014-10-01T00:00:00Z"),
    //                 "grade" : "A",
    //                 "score" : 11
    //             },
    //             {
    //                 "date" : new Date("2014-01-16T00:00:00Z"),
    //                 "grade" : "B",
    //                 "score" : 17
    //             }
    //         ],
    //         "name" : "Vella",
    //         "restaurant_id" : "1"
    //     }, function(err, result) {
    //         assert.equal(err, null);
    //         console.log("Inserted a document into a collection.");
    //         callback(result);
    //     });
    // };

    // var findModels = function(db, callback) {
    //     var cursor = db.collection('restaurants').find({"restaurant_id" : "1"});
    //     cursor.each(function(err, doc) {
    //         assert.equal(err, null);
    //         if (doc != null) {
    //             if (doc == []){
    //                 MongoClient.connect(url, function(err, db) {
    //                     assert.equal(null, err);
    //                     insertModels(db, function() {
    //                     });
    //                 });
    //             } else {
    //                 MongoClient.connect(url, function(err, db) {
    //                     assert.equal(null, err);
    //                     updateModels(db, function() {
    //                     });
    //                 });
    //             }
    //         } else {
    //             callback();
    //         }
    //     });
    // };

    var insertRestaurants = function(db, callback) {
        db.collection('restaurants').insertOne( {
            "address" : {
                "street" : "2 Avenue",
                "zipcode" : "10075",
                "building" : "1480",
                "coord" : [ -73.9557413, 40.7720266 ]
            },
            "borough" : "Manhattan",
            "cuisine" : "Italian",
            "grades" : [
                {
                    "date" : new Date("2014-10-01T00:00:00Z"),
                    "grade" : "A",
                    "score" : 11
                },
                {
                    "date" : new Date("2014-01-16T00:00:00Z"),
                    "grade" : "B",
                    "score" : 17
                }
            ],
            "name" : "Vella",
            "restaurant_id" : "1"
        }, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into a collection.");
            callback(result);
        });
    };

    var findRestaurants = function(db, callback) {
        var cursor = db.collection('restaurants').find({"restaurant_id": '0'});
        console.log('ENTRE');
        cursor.count(false, function(err, count){
            console.log('count');
            console.log(count);
        });
        
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
            } else {
                console.log('no esta');
                callback();
            }
        });
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findRestaurants(db, function() {
              db.close();
          });

    });

    res.send('Connected');
});


module.exports = router;
