/**
 * Created by longfei on 16/4/1.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test1';

var insertDocument = function (db, callback) {
    db.collection('restaurants').insertOne({
        "address": {
            "street": "2 Avenue",
            "zipcode": "10075",
            "building": "1480",
            "coord": [-73.9557413, 40.7720266]
        },
        "borough": "Manhattan",
        "cuisine": "Italian",
        "grades": [
            {
                "date": new Date("2014-10-01T00:00:00Z"),
                "grade": "A",
                "score": 11
            },
            {
                "date": new Date("2014-01-16T00:00:00Z"),
                "grade": "B",
                "score": 17
            }
        ],
        "name": "Vella",
        "restaurant_id": "41704620"
    }, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
    });
};

//db.collection('restaurants').insertOne,向restaurants表格中插入一条数据

var findRestaurantsAll = function (db, callback) {
    var cursor = db.collection('restaurants').find();
    //console.log('cursor',cursor);
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
        } else {
            callback();
        }
    });
};
//db.collection('restaurants').find(),查询restaurants表中的所有数据

var removeRestaurants = function (db, callback) {
    db.collection('restaurants').deleteOne(
        {name: 'Vella'},
        function (err, results) {
            //console.log(results);
            callback();
        }
    );
};
//deleteOne:只删除匹配的一行记录

var removeRestaurantsMany = function (db, callback) {
    db.collection('restaurants').deleteMany(
        {name: 'Vella'},
        function (err, results) {
            // console.log(results);
            callback();
        }
    );
};
//deleteMany:删除所有的匹配行

var removeRestaurantsAll = function(db, callback) {
    db.collection('restaurants').deleteMany( {}, function(err, results) {
        //console.log(results);
        callback();
    });
};
//deleteMany:{}清空表格

var dropRestaurants = function(db, callback) {
    db.collection('restaurants').drop( function(err, response) {
        console.log('删除表格 ',response)
        callback();
    });
};
//drop:删除表格


MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    insertDocument(db, function () {});
    //insertDocument(db, function () {});
    //insertDocument(db, function () {});

    //removeRestaurants(db, function () {})
    //removeRestaurantsMany(db, function () {})
    //removeRestaurantsAll(db,function(){});

    //dropRestaurants(db,function(){});


    findRestaurantsAll(db, function () {
        db.close();
    });
});

//备注:首先在终端启动mongodb服务
//启动mongodb服务的指令:
//在终端中输入:mongod