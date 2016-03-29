/**
 * Created by longfei on 16/3/29.
 */

/*
http 模块提供了两个函数 http.request 和 http.get，功能是作为客户端向 HTTP
服务器发起请求。
http.request(options, callback) 发起 HTTP 请求。接受两个参数，option 是
一个类似关联数组的对象，表示请求的参数，callback 是请求的回调函数。option
常用的参数如下所示。
host ：请求网站的域名或 IP 地址。
port ：请求网站的端口，默认 80。
method ：请求方法，默认是 GET。
path ：请求的相对于根的路径，默认是“/”。QueryString 应该包含在其中。
例如 /search?query=byvoid。
headers ：一个关联数组对象，为请求头的内容。
callback 传递一个参数，为 http.ClientResponse 的实例。
http.request 返回一个 http.ClientRequest 的实例。
*/

//http.request 发送 POST 请求的代码
var http = require('http');
var querystring = require('querystring');
var contents = querystring.stringify({
    name: 'byvoid',
    email: 'byvoid@byvoid.com',
    address: 'Zijing 2#, Tsinghua University',
});
var options = {
    host: '127.0.0.1',
    path: '/',
    method: 'POST',
    port:3002,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length' : contents.length
    }
};
var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
});
req.write(contents);
req.end();

//运行结果如下
/*
{ name: 'byvoid',
    email: 'byvoid@byvoid.com',
    address: 'Zijing 2#, Tsinghua University'
}
*/

//GET 请求的代码
/*
http.get(options, callback) http 模块还提供了一个更加简便的方法用于处
理GET请求：http.get。它是 http.request 的简化版，唯一的区别在于http.get
自动将请求方法设为了 GET 请求，同时不需要手动调用 req.end()。
*/

var http = require('http');
http.get({host: '127.0.0.1',port:3000}, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log('get request',data);
    });
});
/*
运行结果如下:
<h1>Node.js</h1>
<p>Hello World</p>
*/


/*
1. http.ClientRequest
http.ClientRequest 是由 http.request 或 http.get 返回产生的对象，表示一
个已经产生而且正在进行中的 HTTP 请求。它提供一个 response 事件，即 http.request
或 http.get 第二个参数指定的回调函数的绑定对象。我们也可以显式地绑定这个事件的
监听函数：
*/

var http = require('http');
var req = http.get({host: '127.0.0.1',port:3000});
req.on('response', function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
});

/*
http.ClientRequest 像 http.ServerResponse 一样也提供了 write 和 end 函
数，用于向服务器发送请求体，通常用于 POST、PUT 等操作。所有写结束以后必须调用 end
函数以通知服务器，否则请求无效。http.ClientRequest 还提供了以下函数。

request.abort()：终止正在发送的请求。
request.setTimeout(timeout, [callback])：设置请求超时时间，timeout 为
毫秒数。当请求超时以后，callback 将会被调用。
*/

/*
2. http.ClientResponse

http.ClientResponse 与 http.ServerRequest 相似，提供了三个事件 data、end
和 close，分别在数据到达、传输结束和连接结束时触发，其中 data 事件传递一个参数
chunk，表示接收到的数据。

http.ClientResponse 也提供了一些属性，用于表示请求的结果状态
statusCode HTTP 状态码，如 200、404、500
headers HTTP 请求头

http.ClientResponse 还提供了以下几个特殊的函数

response.setEncoding([encoding])：设置默认的编码，当 data 事件被触发
时，数据将会以 encoding 编码。默认值是 null，即不编码，以 Buffer 的形式存
储。常用编码为 utf8。

response.pause()：暂停接收数据和发送事件，方便实现下载功能。

response.resume()：从暂停的状态中恢复。
*/