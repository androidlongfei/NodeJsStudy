/**
 * Created by longfei on 16/2/28.
 */
var dir2json = require('./dir2json.js');


//获取文件夹下的子文件和目录,
var f2j = new dir2json();
var rootDir = "/Users/longfei/test";
console.log('root path:' + rootDir);
f2j.rootDir = rootDir;
f2j.ignores = []; //ignore folder
var jsonObj = f2j.dir();
var fileJson = jsonObj.children;
console.log(rootDir,fileJson);

