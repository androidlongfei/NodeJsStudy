/**
 * Created by longfei on 16/4/6.
 */

//数据校验分两类：
//1.预定义校验器:
// 包括:required,就是必须要有，每个属性都有
//Number(min,max),最大值和最小值
//String(emnu,match),枚举，正则表达式匹配
//2.预定义验证器
//使用validate
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/default');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('testMongoose connect success');
});

var OrderSchema = mongoose.Schema({
    count: {
        type: Number,
        //表示必须要有此字段,否则报错
        required: true,
        //表示此字段的值必须小于1000
        max: 1000,
        //表示此字段的值必须小于10
        min: 10
    },
    status:{
        type:String,
        //枚举，就是此字段只能是以下三个值中的一个，否则报错
        enum:['create','success','fail']
    },
    desc:{
        type:String,
        //正则匹配，就是此字段的值必须包含book,否则报错
        match:/book/g
    },
    content:{
        type:String,
        //自定义验证器(必须是validate，别的会出错),校验文本的长度必须大于10
        validate:function(content){
            if(content.length < 10){
                return false;
            }
            return true;
        }
    }
});

var OrderModel = mongoose.model('Order', OrderSchema);

//test require check
var order = new OrderModel();
order.save(function (err) {
    if (err) {
        console.log('save fail', err);
        return;
    } else {
        console.log('save success');
    }
});
// print save fail Order validation failed
//就是说必须要有count

order.count = 4567;
order.status = 'test';
order.desc = 'poor';
order.content = 'this book';
order.save(function (err) {
    if (err) {
        console.log('save fail', err);
        return;
    } else {
        console.log('save success');
    }
});
// print save fail :
// `count` (4567) is more than maximum allowed value (1000)
//'test` is not a valid enum value for path `status
//desc` is invalid (poor)
// `content` with value `this book`
//就是说count的值必须在10到1000之间,test字段必须在枚举之中(creat,success,fail),desc字段的值必须匹配正则,content字段的值的长度必须大于10.

setTimeout(function(){
    order.count = 500;
    order.status = 'success';
    order.desc = 'mybook';
    order.content = 'this a book about people study';
    order.save(function (err) {
        if (err) {
            console.log('save fail', err);
            return;
        } else {
            console.log('save success');
        }
    });
//print save success
},1000);


