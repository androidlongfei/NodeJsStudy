/**
 * Created by longfei on 16/4/6.
 */

var clientRedis = require('./redis');

//1.list列表存数据，有序，有重复
clientRedis.rpush('myList', 'aaa');
clientRedis.rpush('myList', 'bbb');
clientRedis.rpush('myList', 'ccc');
clientRedis.rpush('myList', 'ddd');
clientRedis.rpush('myList', '111');
clientRedis.rpush('myList', '222');
clientRedis.lrange('myList', 0, -1, function (err, list) {
    console.log(list);
});
//此乃redis的list用法
//rpush：表示向列表中存数据
//lrange:表示从列表中取数据
//备注：0表示第一元素，-1表示最后一个元素，获取整个列表的所有元素
//输出 结果是'aaa','bbb','ccc','111','222'

clientRedis.rpush('myList', 'aaa');
clientRedis.rpush('myList', '222');
clientRedis.rpush('myList', '333');
clientRedis.lrange('myList', 0, -1, function (err, list) {
    console.log(list);
});
//输出 结果是'aaa','bbb','ccc','111','222','aaa','222','333'
//由此可见list是可以存重复的数据




