/**
 * Created by longfei on 16/4/13.
 */

var User = require('./model/user.js');
var createTable = require('./sql/createTable.js');
var deleteTable = require("./sql/deleteTable");

//deleteTable.deleteAllTabel();
createTable.createTable();
//deleteTable.clearTableFromName('my_admin_info');

var addUserData = {
    id: '1',
    name: 'long',
    password: '123456',
    mobile: '18600900541',
    description: 'this'
};

var addUserData1 = {
    id: '2',
    name: 'long1',
    password: '654321',
    mobile: '18600900541',
    description: 'this is a test user'
};

var addUserData2 = {
    id: '3',
    name: 'long2',
    password: '654321',
    mobile: '18600900541',
    description: 'this is a test user'
};

//增加用户
addUser(true, addUserData);
addUser(true, addUserData1);
addUser(true, addUserData2);

//查找用户
queryAllUser();

//更新用户
var updateUserData = {
    id: addUserData1.id,
    name: addUserData1.name,
    password: '65432100',
    mobile: '18600900541',
    description: 'update this user password'
};
updateUser(updateUserData);
//更新用户名long的密码是0000000
var updateUserData = {
    name: addUserData.name,
    password: '0000000'
};
updatePasswodByName(updateUserData);

//删除用户
deleteUserById(addUserData2.id);


/**
 * 增加用户
 * @param checkExist 是否检测重命名
 * @param userData 用户信息
 */
function addUser(checkExist, userData) {
    var user = new User(userData);
    if (checkExist) {
        //如果用户名不存在则插入数据
        User.getByName(userData.name, function (error, exist) {
            if (error) {
                console.log(error);
                return;
            }
            if (exist != 0) {
                console.log('user ' + user['name'] + ' already exist');
            } else {
                user.save(function (error) {
                    if (error) {
                        console.log('insert failed', error);
                    } else {
                        console.log('insert success');
                        //查找所有用户
                        //queryUserById(userData.id);
                        queryAllUser();
                    }
                });
            }
        });
    } else {
        //插入数据
        user.save(function (error) {
            if (error) {
                console.log('insert failed', error);
            } else {
                console.log('insert success');
                //queryUserById(userData.id);
                queryAllUser();
            }
        });
    }
}

/**
 * 根据id查找用户
 * @param id
 */
function queryUserById(id) {
    User.getById(id, function (error, data) {
        if (error) {
            console.log('query user failed');
            return;
        }
        if (data) {
            var msg = 'id is ' + id + ' user list';
            console.log(msg, data);
        }
    });
}

/**
 * 查找所有用户
 */
function queryAllUser() {
    User.getAll(function (error, data) {
        if (error) {
            console.log('query all user failed');
            return;
        }
        if (data) {
            console.log('all user', data);
        }
    });
}

/**
 * 更新用户
 * @param newUser
 */
function updateUser(newUser) {
    var user = new User(newUser);
    user.update(function (err) {
        if (err) {
            console.log('update failed', err);
        } else {
            console.log('update success');
            queryUserById(user['id']);
        }
    });
}

/**
 * 更新用户
 * @param newUser
 */
function updatePasswodByName(newUser) {
    var user = new User(newUser);
    User.getByName(user['name'], function (error, data) {
        if (error) {
            console.log(error);
            return;
        }
        if (data != 0) {
            console.log('name is '+user['name'], data);
            user['id'] = data.id;
            User.updatePasswordByName(function (err) {
                if (err) {
                    console.log('update failed', err);
                } else {
                    console.log('update password success');
                    queryUserById(user['id']);
                }
            }, user);
        } else {
            console.log('user ' + user['name'] + ' no exist');
        }
    });
}

function deleteUserById(id){
    User.deleteById(id,function(error){
        if(error){
            console.log('delete failed',error);
        }else{
            console.log('delete success');
        }
    });
}

