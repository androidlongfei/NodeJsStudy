/**
 * Created by longfei on 16/4/6.
 */

var clientRedis = require('./redis');

//给频道发布消息
clientRedis.publish('testPublish','message from pub.js');

console.log('给testPublish频道发消息');

//备注:
//先运行4-msg-mediation-subscribe.js 注册频道
//然后运行 4-msg-mediation-publish.js 给指定的频道发消息
//此方法可用于进程之间通信

