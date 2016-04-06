/**
 * Created by longfei on 16/4/6.
 */

//虚拟属性virtual：
//它本身不会存储在数据库中，而是通过验算获取的

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/default');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('testMongoose connect success');
});

var UserSchema = mongoose.Schema({
    //姓名
    firstName: String,
    lastName: String
});

/**
 *  虚拟属性(用来获取全名)
 *  fullName:虚拟属性的名字
 */
UserSchema.virtual('fullName').get(function () {
    //this 是当前对象
    return this.firstName + this.lastName;
});

/**
 * 设置，将model转化为json字符串时，将虚拟属性也加上
 */
UserSchema.set('toJSON', {getters: true, virtual: true});

var UserModel = mongoose.model('User', UserSchema);
var user = new UserModel({
    firstName: 'zhang',
    lastName: 'san'
});

console.log('full name', user.fullName);
//print full name zhangsan

console.log('user json', JSON.stringify(user));
//print user json {"firstName":"zhang","lastName":"san","_id":"5704c069d7dcd27c030f4679","fullName":"zhangsan","id":"5704c069d7dcd27c030f4679"}
//注意哦: 虚拟属性也在哦