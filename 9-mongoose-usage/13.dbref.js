/**
 * Created by longfei on 16/4/6.
 */

//dbref:数据库跨表查询
//populate()使用
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/default');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('testMongoose connect success');
});

var UserSchema = mongoose.Schema({
    username: {
        type: String
    }
});


var UserModel = mongoose.model('User', UserSchema);
var user = new UserModel({
    username: 'lisi'
});

var NewsSchema = mongoose.Schema({
    title: {
        type: String
    },
    author:{
        type:mongoose.Schema.ObjectId,
        //用来指定引用哪一个表,这里是User表
        ref:'User'
    }
});

var NewsModel = mongoose.model('News', NewsSchema);
var news = new NewsModel({
    title: 'my writer',
    author:user
});

user.save(function (err) {
    if (err) {
        console.log('save fail', err);
        return;
    }
    news.save(function (err) {
        if (err) {
            console.log('save fail', err);
            return;
        }
        //填充author字段
        NewsModel.findOne().populate('author').exec();
    });
});


