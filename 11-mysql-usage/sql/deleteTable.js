/**
 * delete table in node_test database
 */

var database = require("./database");

exports.deleteAllTabel = deleteAllTabel;
exports.deleteTableFromName = deleteTableFromName;


exports.clearTableFromName = clearTableFromName;

/**
 * 创建my_admin_info表
 */
function deleteAllTabel(){
    //删除my_admin_info表
    deleteTableFromName('my_admin_info');
}


/**
 * 根据表名删除表
 * @param tableName
 */
function deleteTableFromName(tableName){
    var db = database.getConnection();
    //var query = 'drop table' + ' ' + tableName + ';';
    var query = 'drop table if exists'+ ' ' + tableName + ';';
    db.query(query, [], function (err, result) {
        if (err) {
            var msg = 'drop table ' +  tableName + ' failed';
            console.log(msg,err);
        }else{
            console.log('drop table ' +  tableName + ' success',result);
        }
    });
}

/**
 * 根据表名清空表记录
 * @param tableName
 */
function clearTableFromName(tableName){
    var db = database.getConnection();
    var query = 'delete from'+ ' ' + tableName + ';';
    db.query(query, [], function (err, result) {
        if (err) {
            var msg = 'delete table ' +  tableName + ' failed';
            console.log(msg,err);
        }else{
            console.log('delete table ' +  tableName + ' success',result);
        }
    });
}