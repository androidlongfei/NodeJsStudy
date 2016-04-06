/**
 * Created by longfei on 16/4/6.
 */

var clientRedis = require('./redis');

//注册频道
clientRedis.subscribe('testPublish');

//监控频道
clientRedis.on('message', function (channel, msg) {

    console.log('channel:' + channel + ',msg:' + msg);
});

