/**
 * Created by longfei on 16/3/30.
 */

var express = require('express');
var app = express();

/*
express.static(root, [options])
express.static 是 Express 内置的唯一一个中间件。是基于 serve-static 开发的，负责托管 Express 应用内的静态资源。
root 参数指的是静态资源文件所在的根目录。
*/

/*
通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。
将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了
*/

//http://www.expressjs.com.cn/starter/static-files.html

app.use(express.static('public'));
app.listen(5000);

console.log('server already start in 5000 port');

/*
在浏览器中输入输入以下地址，访问静态资源
http://localhost:5000/test.txt
http://localhost:5000/html/test.html
*/


