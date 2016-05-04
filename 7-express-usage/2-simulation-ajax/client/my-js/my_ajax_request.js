/**
 * Created by helongfei on 16-5-4.
 */

$(document).ready(function () {
    $("#getRequestBtn").bind("click", function () {
        $.ajax({
            //url: "http:127.0.0.1:5000/api/node/test", //请求的url地址
            url: "/api/node/test", //请求的url地址
            dataType: "json", //返回格式为json,跨域就用jsonp
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: {"id": "200", "name": "lisi"}, //参数值
            type: "GET",//请求方式
            success: function (res) {
                //请求成功时处理
                console.log('success', res);
            },
            error: function (error) {
                //请求出错处理
                console.log('error', error);
            }
        });
    });

    $("#postRequestBtn").bind("click", function () {
        //send post
        $.ajax({
            //url: "http:127.0.0.1:5000/api/public", //请求的url地址
            url: "/api/public", //请求的url地址
            dataType: "json", //返回格式为json,跨域就用jsonp
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: {"info": "test", "name": "wangwu"}, //参数值
            type: "POST",//请求方式
            success: function (res) {
                //请求成功时处理
                console.log('success', res);
            },
            error: function (error) {
                //请求出错处理
                console.log('error', error);
            }
        });
    });
});