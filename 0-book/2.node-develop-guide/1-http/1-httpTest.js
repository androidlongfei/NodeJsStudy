/**
 * Created by longfei on 16/3/18.
 */


//http 是 Node.js 的一个核心模块，其内部是用 C++ 实现的，外部用 JavaScript 封装。我们通过
//require 函数获取了这个模块，然后才能使用其中的对象。

var http = require('http');

http.createServer(function (req, res) {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write('<h1>Node js</h1>');
        res.end('hello,world');
    }
).listen(4000);

console.log('server already start in 4000 port');