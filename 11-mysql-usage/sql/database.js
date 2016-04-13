var mysql = require('mysql');
var settings = require('../config');

/**
 * 获取mysql连接
 * @returns {*|number|Object|connection}
 */
module.exports.getConnection = function () {
    if ((module.exports.connection) && (module.exports.connection._socket)
        && (module.exports.connection._socket.readable)
        && (module.exports.connection._socket.writable)) {
        return module.exports.connection;
    }
    console.log(((module.exports.connection) ?
            "UNHEALTHY SQL CONNECTION; RE" : "") + "CONNECTING TO SQL.");
    var connection = mysql.createConnection({
        host: settings.MYSQL_HOST,
        port: settings.MYSQL_PORT,
        database: settings.MYSQL_DBNAME,
        user: settings.MYSQL_USER,
        password: settings.MYSQL_PASSWORD,
        //charset: "utf8"
    });
    connection.connect(function (err) {
        if (err) {
            console.log("SQL CONNECT ERROR: " + err);
        } else {
            console.log("SQL CONNECT SUCCESSFUL.");
        }
    });
    connection.on("close", function (err) {
        console.log("SQL CONNECTION CLOSED.");
    });
    connection.on("error", function (err) {
        console.log("SQL CONNECTION ERROR: " + err);
    });
    module.exports.connection = connection;
    return module.exports.connection;
};

module.exports.getConnection();