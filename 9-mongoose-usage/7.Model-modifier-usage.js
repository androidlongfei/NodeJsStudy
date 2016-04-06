/**
 * Created by longfei on 16/4/6.
 */

//模式修饰符分两类：
//1.预定义模式修饰符
//2.自定义模式修饰符

//预定义修饰符主要包括：去除字符串两边的空格,字符串大写,字符串小写等
//自定义修饰符主要包括:
//1.setter修饰符：会在存储数据之前或者创建模型时执行
//2.getter修饰符:从数据库中拿到文档，并将文档转化为模型时执行

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
        //1.预定义修饰符（去除字符串两边的空格）
        trim:true
    },
    //博客
    blog:{
        type:String,
        //自定义修饰符(set)，如果url中没有包括http协议(即http://),则自动加上
        set:function(url){
            if(!url){
                return
            }
            if(0 !== url.indexOf('http://') && 0 !== url.indexOf('https://') ){
                url = 'http://' + url;
                return url;
            }
        }
    }
});

var UserModel = mongoose.model('User', UserSchema);
var user = new UserModel({
    name:'  zhangsan  ',
    blog: 'org.test'
});
console.log('user',user);
//print user { _id: 5704b7f424e91d65032e3c62,blog: 'http://org.test',name: 'zhangsan' }
//注意:'zhangsan'两边已经没有了空格,


var CompanySchema = mongoose.Schema({
    //姓名
    address: {
        type:String,
        //1.预定义修饰符（去除字符串两边的空格）
        trim:true
    },
    //博客
    blog:{
        type:String,
        //自定义修饰符(get)，如果url中没有包括http协议(即http://),则自动加上
        get:function(url){
            if(!url){
                return
            }
            if(0 !== url.indexOf('http://') && 0 !== url.indexOf('https://') ){
                url = 'http://' + url;
                return url;
            }
        }
    }
});

var CompanyModel = mongoose.model('Company', CompanySchema);
var company = new CompanyModel({
    address:'   德外大街1110号  ',
    blog: 'www.micro-helix.com'
});
console.log('company',company);
//没有保存到数据库
//print user { _id: 5704b7f424e91d65032e3c62,blog: '德外大街1110号',blog: 'www.micro-helix.com' }
//注意:address两边已经没有了空格,blog没有http协议

company.save(function(err){
    if(err){return err};
});
CompanyModel.findOne({blog: 'www.micro-helix.com'},function(err,doc){
    if(err){return err};
    console.log('save company',doc.blog);
})
//company保存到数据库后,从数据库中取出数据
//print save company http://www.micro-helix.com
//备注:db中的blog值为www.micro-helix.com，但是doc.blog的值为http://www.micro-helix.com，这就说明get修饰符是在属性被调用时加上的。

