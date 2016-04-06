/**
 * Created by longfei on 16/4/6.
 */

//索引主要包括两种：
//1.唯一索引:保证属性唯一
//2.辅助索引:用来增加查找速度
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/default');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('testMongoose connect success');
});

var BooKSchema = mongoose.Schema({
    //书isbn编号（唯一）
    isnb: {
        type: Number,
        //唯一索引
        unique: true
    },
    name: {
        type: String,
        //辅助索引
        index: true
    }
});

var BookModel = mongoose.model('Book', BooKSchema);

var mybook = new BookModel({
    isnb: 1234,
    name: '英雄'
});

mybook.save(function (err) {
    if (err) {
        console.log(err);
        return;
    }
});

var mybook1 = new BookModel({
    isnb: 1234,
    name: '英雄1'
});

mybook1.save(function (err) {
    if (err) {
        console.log(err);
        return;
    }
});
//备注：测试时如果出错,请重启数据库,并清空表。
//报错 duplicate key error collection: default.books index: isbn_1 dup key 就是说isnb字段必须唯一