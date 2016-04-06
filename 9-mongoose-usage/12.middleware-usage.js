/**
 * Created by longfei on 16/4/6.
 */

//中间件就是方便我们在特定的时候自定义一些操作
//mongoose中间件包括两大类：
//1.文档中间件:
//某一个文档在执行某些特定的操作时，会触发的中间件
//包括:init,validate,save,remove等
//2.查询中间件
//就是在执行某些查询时，触发的中间件
//包括:count,find,findOne,update等

//从时间上讲也分两类
//1.预处理中间件：就是保存数据到数据库之间,删除数据之间，更新数据之间，触发的中间件,
//2.后置中间件:保存数据到数据库之间,删除数据库中的数据之后，更新数据之后，触发的中间件。
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/default');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('testMongoose connect success');
});

var ClassSchema = mongoose.Schema({
    name: {
        type: String
    },
    count: {
        type: Number
    }
});

/**
 * 后置中间件
 * 保存之后所执行的中间件
 * next回调函数
 */
ClassSchema.post('save', function (next) {
    //保存成功后，会执行此方法
    console.log('post save middleware');
    //next();
});

/**
 * 前置中间件
 * 保存之前所执行的中间件
 * next回调函数
 * done需要并行操作的回调函数
 */
ClassSchema.pre('save', true, function (next, done) {
    //保存成功后，会执行此方法
    console.log('pre save middleware');
    next();
    done();
})

var ClassModel = mongoose.model('Class', ClassSchema);

//test require check
var myclass = new ClassModel({
    name: 'one grade',
    count: 100
});
myclass.save(function (err) {
    if (err) {
        console.log('save fail', err);
        return;
    } else {
        console.log('save success');
    }
});
//print


