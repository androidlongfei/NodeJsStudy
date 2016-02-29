/**
 * Created by longfei on 16/2/26.
 */

//require的使用
//require函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。模块名可使用相对路径（以./开头），或者是绝对路径（以/或C:之类的盘符开头）

var foo1 = require('./hello');
var foo2 = require('./hello.js');
var foo3 = require('/Users/longfei/git/NodeJsStudy/NodeJsStudy/0-book/1.seven-study-nodejs/1.基础/require-usage/hello');
var foo4 = require('/Users/longfei/git/NodeJsStudy/NodeJsStudy/0-book/1.seven-study-nodejs/1.基础/require-usage/hello.js');

//注意foo1至foo4中保存的是同一个模块的导出对象。
console.log(foo1.printName());
console.log(foo2.printName());
console.log(foo3.printName());
console.log(foo4.printName());

//另外，可以使用以下方式加载和使用一个JSON文件。
var data = require('./data.json');
console.log(data.name);
console.log(data.age);

//模块初始化
// 一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。
var count1 = require('./count');
console.log('count',count1.count());
console.log('count',count1.count());
var count2 = require('./count');
console.log('count',count2.count());
//输出结果是1，2，3