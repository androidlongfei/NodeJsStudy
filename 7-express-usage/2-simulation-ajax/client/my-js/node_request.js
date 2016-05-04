/**
 * Created by helongfei on 16-5-4.
 */

/**
 * GET请求
 */
var http = require('http');

var request = require('request');

//console.log('__dirname', __dirname);
//console.log('__filename',__filename);

//get 请求/test/next
var option = {host: '127.0.0.1', port: 5000, path: '/api/node/test', data: {"id": "134", 'name': 'zhangsan'}};
http.get(option, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log('get request data', data);
    });
});

//post 请求
//请求参数
var formData = {
    name: 'byvoid',
    email: 'byvoid@byvoid.com',
    address: 'Zijing 2#, Tsinghua University',
}
//请求头
var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
//基本设置
var options = {
    url: 'http://127.0.0.1:5000/api/public',
    method: 'POST',
    headers: headers,
    form: formData
};

request(options,function(error, response, body){
    console.log('post request data',body);

});

/**
 * POST请求
 */
/*var querystring = require('querystring');
var contents = querystring.stringify({
    name: 'byvoid',
    email: 'byvoid@byvoid.com',
    address: 'Zijing 2#, Tsinghua University',
});
var options = {
    host: '127.0.0.1',
    path: '/api/public',
    method: 'POST',
    port: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': contents.length
    }
};
var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
});
req.write(contents);
req.end();*/
