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

//db.collection('restaurants').find(),查询restaurants表中的所有数据

var findRestaurants = function (db, callback) {
    var cursor = db.collection('restaurants').find({"borough": "Manhattan"});
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
        } else {
            //callback();
        }
    });
};
//db.collection('restaurants').find(),查询restaurants表中满足{ "borough": "Manhattan" }的所有数据

var findRestaurantsArr = function (db, callback) {
    var cursor = db.collection('restaurants').find({"grades.grade": "B"});
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            //callback();
        }
    });
};
//db.collection('restaurants').find(),查询restaurants表中满足{ "grades.grade": "B" }的所有数据
//grades.grade是数组grades中的item


var findRestaurantsGt = function(db, callback) {
    var cursor =db.collection('restaurants').find( { "grades.score": { $gt: 30 } } );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            //callback();
        }
    });
};
//db.collection('restaurants').find(),查询restaurants表中满足"grades.score": { $gt: 30 } }的所有数据
//$gt: 30 表示grades.score的值至少大于30

var findRestaurantsLt = function(db, callback) {
    var cursor =db.collection('restaurants').find( { "grades.score": { $lt: 10 } } );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            //callback();
        }
    });
};
//db.collection('restaurants').find(),查询restaurants表中满足"grades.score": { $lt: 30 } }的所有数据
//$lt: 30 表示grades.score的值小于10

var findRestaurantsAnd = function(db, callback) {
    var cursor =db.collection('restaurants').find(
        { "cuisine": "Italian", "address.zipcode": "10075" }
    );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            //callback();
        }
    });
};
//db.collection('restaurants').find(),查询restaurants表中满足{ "cuisine": "Italian", "address.zipcode": "10075" }的所有数据
//就相当于&&,也就是同时满足两个条件

var findRestaurantsOr = function(db, callback) {
    var cursor =db.collection('restaurants').find(
        { $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] }
    );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};
//db.collection('restaurants').find(),查询restaurants表中满足{ $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] }的所有数据
//$or就相当于||,也就是满足两个条件中的任意一个

var findRestaurantsSort = function(db, callback) {
    var cursor =db.collection('restaurants').find().sort( { "borough": 1, "address.zipcode": 1 } );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};
//db.collection('restaurants').find(),查询restaurants表中的所有数据,并按照borough，address.zipcode的值进行排序
//sort就是排序,1:由小到大，-1：由大到小

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    //insertDocument(db,function(){
    //
    //});
    findRestaurantsAll(db, function () {
        db.close();
    });
    //findRestaurants(db, function () {
    //    db.close();
    //});
    //findRestaurantsArr(db, function () {
    //    db.close();
    //});
    //findRestaurantsGt(db, function () {
    //    db.close();
    //});
    //findRestaurantsLt(db, function () {
    //    db.close();
    //});
    //findRestaurantsAnd(db, function () {
    //    db.close();
    //});
    //findRestaurantsOr(db, function () {
    //    db.close();
    //});
    //findRestaurantsSort(db, function () {
    //    db.close();
    //});
});

//备注:首先在终端启动mongodb服务
//启动mongodb服务的指令:
//在终端中输入:mongod