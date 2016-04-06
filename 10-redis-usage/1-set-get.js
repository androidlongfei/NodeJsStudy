/**
 * Created by longfei on 16/4/6.
 */

var clientRedis = require('./redis');

//1.字符串key,字符串value
clientRedis.set('abc','node js');
clientRedis.get('abc',function(err,v){
    console.log(v);
});

clientRedis.set('test','this is test');
clientRedis.get('test',function(err,v){
    console.log(v);
})

clientRedis.get('name',function(err,v){
    console.log(v);
})

//2.字符串key,字符串object

var obj = {
    name:'list',
    age:100,
    sex:'男',
    work:{
        oneDay:'coding',
        twoDay:'study'
    },
    loving:['music','moving']
}

clientRedis.set('person info',JSON.stringify(obj));
clientRedis.get('person info',function(err,v){
    console.log('person info',JSON.parse(v))
});

//3.字符串key,字符串array
var arr = [1,2,3,4,{
    aa:'aa',
    bb:'bb'
}];
clientRedis.set('test array',JSON.stringify(arr));
clientRedis.get('test array',function(err,v){
    var array = JSON.parse(v);
    console.log('test array',array)
    console.log(array[4].aa);
});


