/**
 * Created by longfei on 16/3/30.
 */

var express = require('express');
var app = express();

var router = express.Router();


/**
 * Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。
 中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）,
 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。
 *
 */

//http://www.expressjs.com.cn/guide/using-middleware.html#middleware.application

/*
中间件分以下几种
应用级中间件
路由级中间件
错误处理中间件
内置中间件
第三方中间件
*/

//1.应用级中间件

//应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写

var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
    res.send('USER');
});

app.post('/api/public', function (req, res, next) {
    res.send('public');
});
app.listen(5000);






