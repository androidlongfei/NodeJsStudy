/**
 * create table in node_test database
 */
var database = require("./database");

exports.createTable = function(){
    create_my_admin_info();
}

/**
 * 创建my_admin_info表
 */
function create_my_admin_info(){
    //创建my_admin_info表
    var db = database.getConnection();
    var query = 'create table if not exists node_test.my_admin_info(id varchar(25),name varchar(25) not null,password varchar(25) not null,mobile varchar(45),description varchar(100),group_id int not null auto_increment,primary key(group_id));'
    db.query(query, [], function (err, result) {
        if (err) {
            console.log('create my_admin_info failed',err);
        }else{
            console.log('create my_admin_info success',result);
        }
    });
}