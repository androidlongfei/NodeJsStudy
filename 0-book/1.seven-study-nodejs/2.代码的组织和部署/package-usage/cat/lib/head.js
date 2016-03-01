/**
 * Created by longfei on 16/3/1.
 */

//cat 头部

var color = "白色";

var shape = "多边形";

function getColor (){
    return color;
}

function setColor (mColor){
    color = mColor;
}

function setShape(mShape){
    shape = mShape;
}

function getShape(){
    return shape;
}

exports.setColor = setColor;
exports.setShape = setShape;

exports.getColor = getColor;
exports.getShape = getShape;

