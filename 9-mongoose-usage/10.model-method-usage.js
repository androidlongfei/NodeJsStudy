/**
 * Created by longfei on 16/4/6.
 */

//模型方法分两类：
//1.内置方法包括:find(),find(),remove(),update()等等
//2.自定义方法
    //而自定义方法又分为两类
    //1.自定义静态方法：它不依赖与某一个实例,它是schema的方法
    //2.自定义实例方法:它是某个实例的方法
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/default');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('testMongoose connect success');
});

var BooKSchema = mongoose.Schema({
    isbn: {
        type: Number
    },
    name: {
        type: String
    }
});

/**
 * 自定义静态方法(根据isbn查书)
 * @param isbn 输的isbn号
 * @param cb 回调函数
 */
BooKSchema.statics.findByISBN = function(isbn,cb){
    this.findOne({isbn:isbn},function(err,doc){
        cb(err,doc);
    })
}
//静态方法一般用来写各种辅助的查询

/**
 * 自定义实例方法(打印书本的信息)
 */
BooKSchema.methods.print = function(){
    console.log('book name',this.name);
    console.log('book isbn',this.isbn);
}

var BookModel = mongoose.model('Book', BooKSchema);

var mybook = new BookModel({
    isbn: 4567,
    name: '英雄泪'
});

mybook.save(function (err) {
    if (err) {
        return console.log('保存失败',err);;
    }
    BookModel.findByISBN(4567,function(err,doc){
        console.log('isbn 4567 book is:',doc);
    })

    mybook.print();
});