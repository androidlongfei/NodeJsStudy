/**
 * Created by longfei on 16/4/6.
 */

//dbref:数据库跨表查询
//populate()使用
//A表中的记录可以包含B表中的记录
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
    author: {
        type: mongoose.Schema.ObjectId,
        //用来指定引用哪一个表,这里是User表
        ref: 'User'
    }
});

var NewsModel = mongoose.model('News', NewsSchema);
var news = new NewsModel({
    title: 'my writer',
    author: user
});

user.save(function (err) {
    if (err) {
        console.log('save user fail', err);
        return;
    }
    news.save(function (err) {
        if (err) {
            console.log('save news fail', err);
            return;
        }
    });
});

//多表查询(一步到位使用populate)
NewsModel.findOne().populate('author').exec(function (err, doc) {
    console.log('populate', doc);
});
/*
 News表中包含User表
 print:
 populate { __v: 0,
 author: { __v: 0, username: 'lisi', _id: 5705c5f2428ce2bc04f03bc0 },
 title: 'my writer',
 _id: 5705c5f2428ce2bc04f03bc1 }
 */

//多表查询(分两步)
NewsModel.findOne(function (err, doc) {
    if (err) {
        return;
    }
    console.log('news', doc);
    UserModel.findOne({_id: doc.author}, function (err, doc) {
        console.log('user', doc);
    })

});
/*
 print:
 news { __v: 0,
 author: 5705c5f2428ce2bc04f03bc0,
 title: 'my writer',
 _id: 5705c5f2428ce2bc04f03bc1 }
 user { __v: 0, username: 'lisi', _id: 5705c5f2428ce2bc04f03bc0 }
 */


