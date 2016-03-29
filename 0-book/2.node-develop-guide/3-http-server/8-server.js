/**
 * Created by longfei on 16/3/29.
 */

//1. http.Server 的事件
//http.Server 是一个基于事件的 HTTP 服务器，所有的请求都被封装为独立的事件，
//开发者只需要对它的事件编写响应函数即可实现 HTTP 服务器的所有功能。它继承自
//EventEmitter，提供了以下几个事件。

//request：当客户端请求到来时，该事件被触发，提供两个参数 req 和res，分别是
//http.ServerRequest 和 http.ServerResponse 的实例，表示请求和响应信息。

//connection：当 TCP 连接建立时，该事件被触发，提供一个参数 socket，为
//net.Socket 的实例。connection 事件的粒度要大于 request，因为客户端在
//Keep-Alive 模式下可能会在同一个连接内发送多次请求。

//close ：当服务器关闭时，该事件被触发。注意不是在用户连接断开时。

//除此之外还有 checkContinue、upgrade、clientError 事件

//显示启动服务
var http = require('http');
var server = new http.Server();
server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
});
server.listen(3000);
console.log("HTTP server is listening at port 3000.");

//2. http.ServerRequest
//http.ServerRequest 是 HTTP 请求的信息，是后端开发者最关注的内容。它一般由
//http.Server 的 request 事件发送，作为第一个参数传递，通常简称 request 或 req。

//HTTP 请求一般可以分为两部分：请求头（Request Header）和请求体（Requset Body）。
//以上内容由于长度较短都可以在请求头解析完成后立即读取。而请求体可能相对较长，
//需要一定的时间传输，因此 http.ServerRequest 提供了以下3个事件用于控制请求体
//传输。

//data ：当请求体数据到来时，该事件被触发。该事件提供一个参数 chunk，表示接
//收到的数据。如果该事件没有被监听，那么请求体将会被抛弃。该事件可能会被调
//用多次。
//end ：当请求体数据传输完成时，该事件被触发，此后将不会再有数据到来。
//close： 用户当前请求结束时，该事件被触发。不同于 end，如果用户强制终止了
//传输，也还是调用close。

//3.获取get请求的内容
var http = require('http');
var url = require('url');
var util = require('util');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3001);
console.log("HTTP server is listening at port 3001.");

//在浏览器中访问 http://127.0.0.1:3000/user?name=byvoid&email=byvoid@byvoid.com，我们可以看到浏览器返回的结果：
/*{ search: '?name=byvoid&email=byvoid@byvoid.com',
    query: { name: 'byvoid', email: 'byvoid@byvoid.com' },
    pathname: '/user',
    path: '/user?name=byvoid&email=byvoid@byvoid.com',
    href: '/user?name=byvoid&email=byvoid@byvoid.com'
}*/

/*4.获取 POST 请求内容
GET 请求把所有的内容编码到访问路径中，POST 请求的内容全部都在请求体中。
http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件
耗时的工作，譬如上传文件。而很多时候我们可能并不需要理会请求体的内容，恶意的 POST
请求会大大消耗服务器的资源。所以 Node.js 默认是不会解析请求体的，当你需要的时候，
需要手动来做*/

var http = require('http');
var querystring = require('querystring');
var util = require('util');
http.createServer(function(req, res) {
    var post = '';
    req.on('data', function(chunk) {
        post += chunk;
    });
    req.on('end', function() {
        console.log('post content',post);
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3002);
console.log("HTTP server is listening at port 3002.");


/*5. http.ServerResponse
http.ServerResponse 是返回给客户端的信息，决定了用户最终能看到的结果。它
也是由 http.Server 的 request 事件发送的，作为第二个参数传递，一般简称为
response 或 res。
http.ServerResponse 有三个重要的成员函数，用于返回响应头、响应内容以及结束
请求

response.writeHead(statusCode, [headers])：向请求的客户端发送响应头。
statusCode 是 HTTP 状态码，如 200 （请求成功）、404 （未找到）等。headers
是一个类似关联数组的对象，表示响应头的每个属性。该函数在一个请求内最多只
能调用一次，如果不调用，则会自动生成一个响应头。

response.write(data, [encoding])：向请求的客户端发送响应内容。data 是
一个 Buffer 或字符串，表示要发送的内容。如果 data 是字符串，那么需要指定
encoding 来说明它的编码方式，默认是 utf-8。在 response.end 调用之前，
response.write 可以被多次调用。

response.end([data], [encoding])：结束响应，告知客户端所有发送已经完
成。当所有要返回的内容发送完毕的时候，该函数 必须 被调用一次。它接受两个可
选参数，意义和 response.write 相同。如果不调用该函数，客户端将永远处于
等待状态。
*/