/**
 * Created by longfei on 16/3/31.
 */

/**
 * GET请求
 */
var http = require('http');

//get 请求/about
http.get({host: '127.0.0.1', port: 5000, path: '/user/:123'}, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log('get request', data);
    });
});

//get 请求/test/next
http.get({host: '127.0.0.1', port: 5000, path: '/'}, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log('get request', data);
    });
});

/**
 * POST请求
 */
var querystring = require('querystring');
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
req.end();
