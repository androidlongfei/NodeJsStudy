/**
 * Created by longfei on 16/3/29.
 */

//JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可
//以在程序的任何地方访问，即全局变量。在浏览器 JavaScript 中，通常 window 是全局对象，
//而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global
//对象的属性。

//global 最根本的作用是作为全局变量的宿主

//1.process
//process 是一个全局变量，即 global 对象的属性。它用于描述当前 Node.js 进程状态
//的对象，提供了一个与操作系统的简单接口。

//process.argv是命令行参数数组，第一个元素是 node，第二个元素是脚本文件名，
//从第三个元素开始每个元素是一个运行参数

console.log(process.argv);

//process.stdout是标准输出流
//process.stdin是标准输入流

//2.util
//util 是一个 Node.js 核心模块，提供常用函数的集合，用于弥补核心 JavaScript 的功能过于精简的不足。

//3.事件驱动 events
//events 是 Node.js 最重要的模块，没有“之一”，原因是 Node.js 本身架构就是事件式
//的，而它提供了唯一的接口，所以堪称 Node.js 事件编程的基石。events 模块不仅用于用

//events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就
//是事件发射与事件监听器功能的封装。EventEmitter 的每个事件由一个事件名和若干个参
//数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持
//若干个事件监听器。当事件发射时，注册到这个事件的事件监听器被依次调用，事件参数作
//为回调函数参数传递。


//4.文件系统 fs

//5.HTTP 服务器与客户端
