/**
 * Created by longfei on 16/3/18.
 */

//创建Hello类
function Hello() {
    var mName;
    this.setName = function (name) {
        mName = name;
    }

    this.sayHello = function () {
        console.log('hello,world ' + mName);

    }

}

exports.Hello = Hello;


