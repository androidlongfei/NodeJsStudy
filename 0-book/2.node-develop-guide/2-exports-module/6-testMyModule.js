/**
 * Created by longfei on 16/3/18.
 */


//获取hello类(多次获取都会获取同一个类)
var Hello = require('./myModule');

//创建hello对象
var hello = new Hello();
console.log(hello);
hello.setName('long');
hello.sayHello();

//创建hello1对象
var hello1 = new Hello();
hello1.setName('fei');

hello.sayHello();

//注意，模块接口的唯一变化是使用 module.exports = Hello 代替了 exports.Hello=Hello。
// 在外部引用该模块时，其接口对象就是要输出的 Hello 对象本身，而不是原先的exports。

//事实上，exports 本身仅仅是一个普通的空对象，即 {}，它专门用来声明接口，本
//质上是通过它为模块闭包①的内部建立了一个有限的访问接口。因为它没有任何特殊的地方，
//所以可以用其他东西来代替，譬如我们上面例子中的 Hello 对象。

//不可以通过对 exports 直接赋值代替对 module.exports 赋值。
//exports 实际上只是一个和 module.exports 指向同一个对象的变量，
//它本身会在模块执行结束后释放，但 module 不会，因此只能通过指定
//module.exports 来改变访问接口。