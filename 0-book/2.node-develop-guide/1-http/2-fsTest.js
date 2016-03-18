/**
 * Created by longfei on 16/3/18.
 */

var fs = require('fs');

//异步读取文件
fs.readFile('../nodes.txt','utf-8',function (error, data) {
        if(error){
            console.log(error)
        }else{
            console.log(data);
        }
    }
)
console.log('end.');

//同步读取文件
var data = fs.readFileSync('../nodes.txt','utf-8');
console.log(data);

console.log('end.');