/**
 * Created by longfei on 16/3/18.
 */

var mName;

exports.setName=function(name){
    mName = name;
}

exports.sayHello = function(){

    console.log('hello,world '+ mName);

}

