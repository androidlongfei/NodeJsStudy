/**
 * Created by longfei on 15/12/28.
 */

//require 用来获取模块的对象,注意:必须要加上'./'
var student = require('./student');
var teacher = require('./teacher');

function add(newTeacher,newStudents){
    teacher.add(newTeacher);
    newStudents.forEach(function(item,index){
        student.add(item);
    })
}

//exports 用来向外曝露属性和方法，供外部对象调用
exports.add = add;
