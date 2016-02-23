/**
 * Created by longfei on 15/12/29.
 */

function show(something){
    console.log(something);
}

function learn(callback,test){
    test += ' node.js'
    callback(test);
}

learn(show,'I am studying');




