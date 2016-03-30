/**
 * Created by longfei on 16/3/30.
 */

var express = require('express');
var app = express();

/**
 * 1.app.locals的生命周期是整个应用的生命周期，它也可以在模板中使用
 *
 */

app.locals.title = 'My App';
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';

app.listen(5000);

console.log('server already start in 5000 port');

console.log(app.locals.title)
console.log(app.locals.strftime)
console.log(app.locals.email)



