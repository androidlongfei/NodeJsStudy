/**
 * create table in node_test database
 */
var createTable = require("./createTable");
var deleteTable = require("./deleteTable");

function createTable(){
    createTable.createTable();
}

exports.createTable = createTable;