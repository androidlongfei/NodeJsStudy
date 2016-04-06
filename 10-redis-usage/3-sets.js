/**
 * Created by longfei on 16/4/6.
 */

var clientRedis = require('./redis');

//1.set集合存数据,无序无重复
clientRedis.sadd('mySet', 'aaa');
clientRedis.sadd('mySet', 'bbb');
clientRedis.sadd('mySet', 'ccc');
clientRedis.sadd('mySet', 'ddd');
clientRedis.sadd('mySet', '111');
clientRedis.sadd('mySet', '222');
clientRedis.smembers('mySet', function (err, sets) {
    console.log(sets);
});
//此乃redis的set集合的用法
//sadd：表示向集合中存数据
//smembers:表示从集合中取数据
//输出 结果是'aaa','bbb','ccc','111','222'

clientRedis.sadd('mySet', 'aaa');
clientRedis.sadd('mySet', '222');
clientRedis.sadd('mySet', '333');
clientRedis.smembers('mySet', function (err, sets) {
    console.log(sets);
});
//输出 结果是'aaa','bbb','ccc','111','222','333'
//由此可见set集合不可以存重复的数据




