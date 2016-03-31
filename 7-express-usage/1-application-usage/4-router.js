/**
 * Created by longfei on 16/3/30.
 */

var express = require('express');
var app = express();

var router = express.Router();

/**
 * express.Router,在路由之前会先调用中间件
 *
 */

app.listen(5000);
// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.use(function showReq(req, res, next) {
    //console.log('req: ', req);
    console.log('处理参数');
    next();
});

// 定义test主页的路由
router.get('/test', function(req, res) {
    console.log('get request /test router');
    res.send('Birds home page');
});

// 定义 about 页面的路由
router.get('/about', function(req, res) {
    console.log('get request /about router');
    res.send('About birds');
});

// 定义 about 页面的路由
router.get('/test/next', function(req, res) {
    console.log('get request /about router');
    res.send('About birds');
});

// 定义 about 页面的路由
router.post('/public', function(req, res) {
    console.log('post request /public router');
    res.send('public birds');
});

app.use('/api', router);

//test/testRouter.js进行测试





