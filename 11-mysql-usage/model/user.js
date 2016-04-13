/**
 * User Obj operate
 * @type {exports|module.exports}
 */

var database = require("../sql/database");
module.exports = User;

function User(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}

/**
 * 保存用户数据
 * @param fn数据库错误的回调函数
 */
User.prototype.save = function (fn) {
    var db = database.getConnection();
    var query = "Insert into my_admin_info (id,name,password,mobile,description) values(?,?,?,?,?)";
    db.query(query, [this.id, this.name, this.password, this.mobile, this.description], function (err, result) {
        if (err) {
            fn(err);
            return;
        }
        fn(null);
    });
};


/**
 * 根据用户名查找用户
 * @param name 用户名
 * @param fn 回调函数
 */
User.getByName = function (name, fn) {
    var db = database.getConnection();
    var query = "SELECT * from my_admin_info where name=? limit 1";
    db.query(query, [name], function (err, rows) {
        //console.log("rows", rows);
        if (err) {
            return fn(err, 0);
        }
        if (!rows || rows[0] == undefined) {
            return fn(null, 0);
        } else {
            return fn(null, rows[0]);
        }
    });
};

/**
 * 更新用户信息
 * @param fn
 */
User.prototype.update = function (fn) {
    var db = database.getConnection();
    var user = this;
    var id = user.id;
    var name = user.name;
    var mobile = user.mobile;
    var password = user.password;
    var description = user.description;
    var sql = "UPDATE my_admin_info SET mobile=?,name=?,password=?,description=? where id=?";
    db.query(sql, [mobile, name, password, description, id], function (err, result) {
        if (err) {
            fn(err);
        } else {
            fn(null);
        }

    });
};

/**
 * 更新用户信息
 * @param fn
 */
User.updatePasswordByName = function (fn, newUser) {
    var db = database.getConnection();
    var id = newUser.id;
    var name = newUser.name;
    var password = newUser.password;
    var sql = "UPDATE my_admin_info SET password=? where id=? and name=?";
    db.query(sql, [password, id, name], function (err, result) {
        if (err) {
            fn(err);
        } else {
            fn(null);
        }
    });
};

/**
 * 查找所有用户
 * @param fn
 */
User.getAll = function (fn) {
    var db = database.getConnection();
    var query = "SELECT * from my_admin_info;"
    db.query(query, [], function (err, rows) {
        if (err) {
            fn(err, null);
        } else {
            if (!rows || rows[0] == undefined) {
                return fn(null, null);
            } else {
                return fn(null, rows);
            }
        }
    });
};

/**
 * 根据id查找用户
 * @param id
 * @param fn
 */
User.getById = function (id, fn) {
    var db = database.getConnection();
    var query = "SELECT * from my_admin_info where id=?";
    db.query(query, [id], function (err, rows) {
        if (err) {
            fn(error, null);
        } else {
            if (!rows || rows == undefined) {
                return fn(null, null);
            } else {
                return fn(null, rows);
            }
        }
    });
};

/**
 * 根据id删除用户
 * @param id
 * @param fn
 */
User.deleteById = function (id, fn) {
    var db = database.getConnection();
    var query = "DELETE from my_admin_info where id=?";
    db.query(query, [id], function (err, result) {
        if (err) {
            fn(err);
        } else {
            fn(null);
        }
    });
};

/**
 * 根据name删除用户
 * @param id
 * @param fn
 */
User.deleteById = function (name, fn) {
    var db = database.getConnection();
    var query = "DELETE from my_admin_info where name=?";
    db.query(query, [name], function (err, result) {
        if (err) {
            fn(err);
        } else {
            fn(null);
        }
    });
};






