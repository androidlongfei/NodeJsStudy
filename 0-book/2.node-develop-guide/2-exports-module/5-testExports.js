/**
 * Created by longfei on 16/3/18.
 */

//获取hello类(多次获取都会获取同一个类)
var Hello = require('./module').Hello;

//创建hello对象
var hello = new Hello();
console.log(hello);
hello.setName('long');
hello.sayHello();

//创建hello1对象
var hello1 = new Hello();
hello1.setName('fei');

hello.sayHello();

//module.sayHello()，两次输出的结果一样
//结果如下：
// hello,world long
// hello,world long
//这是因为Hello是一个类,hello 与 hello1是两个不同的对象,她们相互之间不会有覆盖的影响



