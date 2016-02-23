/**
 * Created by longfei on 15/12/28.
 */
const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer(function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/plain'
    });
    res.end('Hello World');
}).listen(port,hostname);
console.log('Server running at http://127.0.0.1:1337/');

//http.createServer((req, res) => {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//res.end('Hello World\n');
//}).listen(port, hostname, () => {
//    console.log(`Server running at http://${hostname}:${port}/`);
//    });





/**
 * 1.打开终端，进入到server.js目录
 * 2.输入node server.js
 * 3.此时服务已经运行起来了，然后再浏览器地址栏输入127.0.0.1:1337就能显示hello,world
 * 4.第一个示例运行成功
 */
