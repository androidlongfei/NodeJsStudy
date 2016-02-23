/**
 * Created by longfei on 15/12/29.
 */

var http = require('http');
http.createServer(function(req,res){
    res.writeHead(200,{
        'Content-type':'text-plain'
    });
    res.end('sucess !!');
}).listen(2005,'127.0.0.1');
console.log('start server ok');


Jenkins


