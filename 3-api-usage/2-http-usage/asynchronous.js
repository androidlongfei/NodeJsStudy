/**
 * Created by longfei on 15/12/29.
 */

//异步就是程序不按顺序执行
//同步就是程序按一定的顺序执行
//浏览器解析引擎就是同步的， 就是说js顺序加载
//js 是通过setTimeout()来实现异步的


var c =0;


function print(){
    console.log(c);
}

function add(callback){
    setTimeout(function () {
        c++;
        callback();
    },1000);
}

add(print);









