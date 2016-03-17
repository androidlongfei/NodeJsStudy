/**
 * Created by longfei on 16/3/8.
 */

//1. series(tasks, [callback]) （多个函数依次执行，之间没有数据交换）
//有多个异步函数需要依次调用，一个完成之后才能执行下一个。各函数之间没有数据的交换，仅仅需要保证其执行顺序。这时可使用series。

/*
 该函数的详细解释为：
 1.依次执行一个函数数组中的每个函数，每一个函数执行完成之后才能执行下一个函数。
 2.如果任何一个函数向它的回调函数中传了一个error，则后面的函数都不会被执行，并且将会立刻会将该error以及已经执行了的函数的结果，传给series中最后那个callback。
 3.当所有的函数执行完后（没有出错），则会把每个函数传给其回调函数的结果合并为一个数组，传给series最后的那个callback。
 4.还可以json的形式来提供tasks。每一个属性都会被当作函数来执行，并且结果也会以json形式传给series最后的那个callback。这种方式可读性更高一些。
 */

var async = require('async')

/*
 简写
 async.series([
 step1, step2, step3
 ], function (err, values) {
 // do somethig with the err or values v1/v2/v3
 });
 */

var taskId = 100;

async.series([function (callback) {
        console.log('step1', ++taskId);
        callback(null, taskId);
    }, function (callback) {
        console.log('step2', ++taskId);
        callback(null, taskId);
    }, function (callback) {
        console.log('step3', ++taskId);
        callback(null, taskId);
    }],
    function (err, values) {
        // do somethig with the err or values [101,102,103]
        if (err) {
            console.log('error', err);
        }
        console.log('result', values);
    }
);

async.series([
        function (callback) {
            setTimeout(function () {
                callback(null, [1, 2])
            }, 2000)
        },
        function (callback) {
            setTimeout(function () {
                callback(null, ['OK', 'hello'])
            }, 3000)
        }],
    function (err, result) {
        console.log(result);
    }
);

testSeries();
testSeries();

function testSeries(){

    var testValue = 300;

    async.series([
            function (callback) {
                setTimeout(function () {
                    callback(null, testValue)
                }, 5000)
            },
            function (callback) {
                setTimeout(function () {
                    callback(null, testValue)
                }, 3000)
            }],
        function (err, result) {
            console.log(result);
        }
    );

    testValue++;
    testValue++;
}


