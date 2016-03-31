/**
 * Created by longfei on 16/3/30.
 */

var express = require('express');
var app = express();

/**
 * 路由方法源于 HTTP 请求方法，和 express 实例相关联。下面这个例子展示了为应用跟路径定义的 GET 和 POST 请求
 *
 */


app.listen(5000);

// GET method route
app.get('/', function (req, res) {
    console.log('get reuqest for root');
    res.send('GET request to the homepage');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
    console.log('get reuqest for about');
    res.send('about');
});

// POST method route
app.post('/', function (req, res) {
    console.log('post reuqest');
    res.send('POST request to the homepage');
});

/**
 * app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。
 */

app.all('/test/all', function (req, res) {
    console.log('all reuqest');
    res.send('all request to the homepage');
});

app.all('/test/next', function (req, res, next) {
    console.log('all next reuqest');
    next();
});

app.get('/test/next', function (req, res) {
    console.log('get next  reuqest');
    res.send('all request to the homepage');
});

//备注：对于（/test/next）先走all,再走get





