/**
 * Created by longfei on 16/3/1.
 */

var cat = require('../lib/main.js');

var whiteCat = cat.createCar('小白','白色');

console.log('name',whiteCat.name);
console.log('head',whiteCat.head);
console.log('body',whiteCat.body);

var info = "我创建了一只名叫[" + whiteCat.name +"]的cat,它的头部是[" + whiteCat.head +"],身体是["+whiteCat.body+"]";

console.log(info);
