var express = require('express');
var app = express();

//第三方中间件
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var path = require('path');
var router = express.Router();

//第三方中间件的使用
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static('client'));

//__dirname 当前路径
//__filename 当前在执行的js文件路径

// 处理/api/test  get请求
router.get('/api', function (req, res, next) {
    var filePath = path.join(__dirname, 'client', 'test.ajx.html');
    //console.log('filePath', filePath);
    res.sendFile(filePath);
});

// 处理/api/test  node or ajax send get请求
router.get('/api/node/test', function (req, res) {
    var data = req.originalUrl;
    console.log('get request', data);
    var result = {};
    result['test_data'] = 'get request ok';
    result['code'] = 200;
    res.json(result);
});

// 处理/api/public  post请求
router.post('/api/public', function (req, res, next) {
    var data = req.body;
    console.log('post request', data);
    var result = {};
    result['post_data'] = 'post request ok';
    result['code'] = 200;
    res.json(result);
});

// 将路由挂载至应用
app.use('/', router);
app.listen(5000);

console.log('start running in 5000 port');






