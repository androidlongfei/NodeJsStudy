/**
 * Created by longfei on 16/3/18.
 */

var module = require('./module');

module.setName('long');
module.sayHello();

var module1 = require('./module');

module1.setName('fei');
module.sayHello();

//module.sayHello()，两次输出的结果不一样
//结果如下：
// hello,world long
// hello,world fei
//这是因为变量 module和module1 指向的是同一个实例

//上面这个例子有点类似于创建一个对象，但实际上和对象又有本质的区别，因为
//require 不会重复加载模块，也就是说无论调用多少次 require，获得的模块都是同一个


