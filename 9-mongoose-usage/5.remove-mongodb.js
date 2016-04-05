/**
 * Created by longfei on 16/4/1.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testTwoMongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('testMongoose connect success');
});

var Schema = mongoose.Schema;
var PersonSchema = new Schema({
    name: String,
    age: Number,
    sex: String,
    height: String,
    weight: String,
    color: {loving: String, locking: String},
    love: [String]
});

//创建PersonModel表
var PersonModel = mongoose.model('PersonModel', PersonSchema);

var zhansanModel = new PersonModel({
    name: 'zhansan',
    age: '25',
    sex: 'male',
    height: '177',
    weight: '65',
    color: {
        loving: 'white',
        locking: 'green'
    }
});
//向PersonMode表中插入一条数据,使用Entity的方法
zhansanModel.save();


var heLiuModel = {
    name: 'heLiu',
    age: '32',
    sex: 'male',
    weight: '65'
};
//向PersonMode表中插入一条数据,使用model的方法
PersonModel.create(heLiuModel, function () {

});

//移除一条数据
PersonModel.remove({ age: '32' }, function (err) {
    if (err) return handleError(err);
    // removed!
});

//查询PersonModel中的所有数据
PersonModel.find(function (err, person) {
    if (err) return console.error(err);
    console.log(person);
})


