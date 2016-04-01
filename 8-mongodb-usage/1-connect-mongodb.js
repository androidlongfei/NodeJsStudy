/**
 * Created by longfei on 16/4/1.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.close();
});

//备注:首先在终端启动mongodb服务
//启动mongodb服务的指令:
//在终端中输入:mongod