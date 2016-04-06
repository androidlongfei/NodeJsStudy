/**
 * Created by longfei on 16/4/6.
 */

//默认值分两类：
//1.固定值
//2.即使生成

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/default');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('testMongoose connect success');
});

var UserSchema = mongoose.Schema({
    //姓名
    name: {
        type:String,
        //1.固定默认值的使用
        default:'test'
    },
    //注册时间
    regDate:{
        type:String,
        //2.及时生成默认值(即注册的时候，就会生成时间戳)
        default:Date.now
    }
});

var UserModel = mongoose.model('User', UserSchema);
var user = new UserModel();
console.log('default user',user);
//print default user { name: 'test',regDate: '1459925822178',_id: 5704b33eeaabdb5903b7d4c2 }

