/**
 * Created by longfei on 16/3/18.
 */

//Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列

/**
 * 事件触发器
 */
var EventEmitter = require('events').EventEmitter;;

var event = new EventEmitter();


event.on('some_event', function() {
    console.log('some_event occured.');
});

setTimeout(function(){
    event.emit('some_event');
},1000);
