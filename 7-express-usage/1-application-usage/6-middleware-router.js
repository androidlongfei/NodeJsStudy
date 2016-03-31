/**
 * Created by longfei on 16/3/30.
 */


//2.路由级中间件
//路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。

//3.第三方中间件
//4.内置中间件
//5.错误中间件

var express = require('express');
var app = express();

//第三方中间件
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var router = express.Router();


//错误中间件的使用
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//内置中间件的使用
app.use(express.static('public'));

//第三方中间件的使用
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());


// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
}, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
    // 如果 user id 为 0, 跳到下一个路由
    if (req.params.id == 0) next('route');
    // 负责将控制权交给栈中下一个中间件
    else next(); //
}, function (req, res, next) {
    // 渲染常规页面
    //res.render('regular');
    //res.send('regular');
    next();
});

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
    //console.log(req.params.id);
    //res.render('special');
    res.send('regular');
});

// 处理/api/test  get请求
router.get('/api/test', function (req, res, next) {
    res.send(req.body);
});

// 处理/api/public  post请求
router.post('/api/public', function (req, res, next) {
    console.log('/api/public parameter', req.body);
    res.send(req.body);
});

// 将路由挂载至应用
app.use('/', router);


app.listen(5000);






