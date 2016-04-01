/**
 * Created by longfei on 16/4/1.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testMongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('testMongoose connect success');
});

var kittySchema = mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'fluffy' });
//fluffy.speak(); // "Meow name is fluffy"

//保存fluffy到数据库
fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    //fluffy.speak();
});

//在数据库中查询
Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
})