/**
 * Created by longfei on 16/4/6.
 */

var REDIS_PORT = 6379;
var REDIS_HOST = 'localhost';

var redis = require("redis");
var clientRedis = redis.createClient(REDIS_PORT,REDIS_HOST);

clientRedis.on("error", function (err) {
    console.log("Error " + err);
});

module.exports= clientRedis;