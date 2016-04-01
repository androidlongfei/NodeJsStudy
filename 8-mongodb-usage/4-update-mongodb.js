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
        //console.log('insert result',result);
        console.log("Inserted a document into the restaurants collection.");
        //findRestaurantsAll(db,callback);
        //findRestaurants(db,callback);
        findRestaurantsArr(db, callback);
        findRestaurantsGt(db, callback);
        findRestaurantsLt(db, callback);
        findRestaurantsAnd(db, callback);
        callback();
    });
};

//db.collection('restaurants').insertOne,向restaurants表格中插入一条数据

var findRestaurantsAll = function (db, callback) {
    var cursor = db.collection('restaurants').find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
        } else {
            //callback();
        }
    });
};

var updateRestaurants = function (db, callback) {
    db.collection('restaurants').updateOne(
        {"name": "Vella"},
        {
            $set: {"cuisine": "American"},
            $currentDate: {"lastModified": true}
        }, function (err, results) {
            //console.log(results);
            callback();
        });
};
//updateOne更新一条数据，{ "name" : "Vella" } 是条件，
// $set: { "cuisine": "American" }需要更新的数据,
// $currentDate: { "lastModified": true } 更改的时间

var updateRestaurantsField = function (db, callback) {
    db.collection('restaurants').updateOne(
        {"restaurant_id": "41704620"},
        {$set: {"address.street": "East 31st Street"}},
        function (err, results) {
            console.log(results);
            callback();
        });
};
// $set: { "address.street": "East 31st Street" } 更新address对象里的一个属性,

var updateRestaurantsMany = function (db, callback) {
    db.collection('restaurants').updateMany(
        {"address.zipcode": "10075", "address.building": "1480"},
        {
            $set: {cuisine: "Category To Be Determined"},
            $currentDate: {"lastModified": true}
        }
        ,
        function (err, results) {
            console.log(results);
            callback();
        });
};
//updateMany:同时满足{ "address.zipcode": "10016", cuisine: "Other" }时，才去更新{ cuisine: "Category To Be Determined" }


var updateRestaurantsReplace = function (db, callback) {
    db.collection('restaurants').replaceOne(
        {"restaurant_id": "41704620"},
        {
            "name": "Vella 2",
            "address": {
                "coord": [-73.9557413, 40.7720266],
                "building": "1480",
                "street": "2 Avenue",
                "zipcode": "10075"
            }
        },
        function (err, results) {
            //console.log(results);
            callback();
        });
};
//replaceOne替换，走三步
//需要替换的属性在原表格中有，则会替换，
//需要替换的属性在原表格中没有有，则增加进去，
//删除原表格中与需要替换的属性不一致的属性


MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    //insertDocument(db,function(){
    //
    //});

    updateRestaurants(db, function () {

    });
    updateRestaurantsField(db, function () {
    });

    updateRestaurantsMany(db, function () {
    });

    updateRestaurantsReplace(db, function () {
    });

    findRestaurantsAll(db, function () {
        db.close();
    });
});

//备注:首先在终端启动mongodb服务
//启动mongodb服务的指令:
//在终端中输入:mongod