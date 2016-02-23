/**
 * Created by longfei on 15/12/28.
 */

//获取一个url模块对象
var url = require('url');

//1.解析url字符处，并返回一个对象
var urlObj = url.parse('https://nodejs.org/dist/latest-v4.x/docs/api/?name=zhangsan&age=20');
console.log(urlObj);
/**
 * 输出结果为
 * 注意:query就是参数列表,它是一个字符串
 * {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'nodejs.org',
  port: null,
  hostname: 'nodejs.org',
  hash: null,
  search: '?name=zhangsan&age=20',
  query: 'name=zhangsan&age=20',
  pathname: '/dist/latest-v4.x/docs/api/',
  path: '/dist/latest-v4.x/docs/api/?name=zhangsan&age=20',
  href: 'https://nodejs.org/dist/latest-v4.x/docs/api/?name=zhangsan&age=20' }
 */

//加上第二个参数true,解析的时候，会将参数列表(就是query字段)封装成对象
var urlObj = url.parse('https://nodejs.org/dist/latest-v4.x/docs/api/?name=zhangsan&age=20',true);
console.log(urlObj);
/**
 * 输出结果
 * 注意:query已经是一个对象了
 * {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'nodejs.org',
  port: null,
  hostname: 'nodejs.org',
  hash: null,
  search: '?name=zhangsan&age=20',
  query: { name: 'zhangsan', age: '20' },
  pathname: '/dist/latest-v4.x/docs/api/',
  path: '/dist/latest-v4.x/docs/api/?name=zhangsan&age=20',
  href: 'https://nodejs.org/dist/latest-v4.x/docs/api/?name=zhangsan&age=20' }
 */




/**
 *
 * 2.组装拼接url
 * url.resolve(from, to)
 */

var urlObj = url.resolve('https://nodejs.org/dist/latest-v4.x/','docs/lisi');
console.log(urlObj);
/**
 *输出结果为
 *https://nodejs.org/dist/latest-v4.x/docs/lisi
 */

/**
 * 3.将一个对象格式化成标准的url
 * protocol:协议
 * slashes:是否需要加斜杆
 */
var urlObj = url.format({
    protocol: 'https:',
    slashes: true,
    host: 'nodejs.org',
    query: { name: 'zhangsan', age: '20' },
    pathname: '/dist/latest-v4.x/docs/api/'
});
console.log(urlObj);
/**
 *输出结果为
 *https://nodejs.org/dist/latest-v4.x/docs/api/?name=zhangsan&age=20
 */