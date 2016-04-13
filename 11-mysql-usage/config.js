exports.pagesize = 10;
var fs = require('fs');
var Path = require('path');

//本地数据库配置
exports.MYSQL_HOST = (process.env.MYSQL_HOST||'127.0.0.1');
exports.MYSQL_USER = (process.env.MYSQL_USER||'longfei');
exports.MYSQL_PORT = (process.env.MYSQL_PORT||'3306');
exports.MYSQL_DBNAME = (process.env.MYSQL_DBNAME||'node_test');
exports.MYSQL_PASSWORD = (process.env.MYSQL_PASSWORD||'123456');

exports.port = 3000;
exports.root = __dirname;


