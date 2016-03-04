/**
 * Created by longfei on 16/3/1.
 */

var head = require('./head.js');
var body = require('./body.js');

function createCar(name,color){
    head.setColor(color);
    body.setColor(color);
    return {
        name:name,
        head:head.getColor(),
        body:body.getColor()
    }
}

exports.createCar = createCar;
