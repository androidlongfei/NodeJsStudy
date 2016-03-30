/**
 * Created by longfei on 16/3/30.
 */

/*
闭包的构成:
闭包是通过在对一个函数调用的执行环境中返回一个函数对象构成的。比如，在对函数调用的过程中，将一个对内部函数对象的引用指定给另一个对象的属性。
或者，直接将这样一个（内部）函数对象的引用指定给一个全局变量、或者一个全局性对象的属性，或者一个作为参数以引用方式传递给外部函数的对象。
*/

/*
 再来看一个例子，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，
 那么我们就需要将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找，如果找不到，则进行计算，
 然后更新缓存并返回值，如果找到了，直接返回查找到的值即可。闭包正是可以做到这一点，因为它不会释放外部的引用，
 从而函数内部的值可以得以保留。
 */
//1.通过闭包缓存数据
var CachedSearchBox = function () {
    var cache = {},
        count = [];
    return {
        attachSearchBox: function (dsid) {
            if (dsid in cache) {//如果结果在缓存中
                if (dsid == dsid)
                    return cache[dsid];//直接返回缓存中的对象
            }
            var fsb = {test: 'zhangsan'};//新建
            cache[dsid] = fsb;//更新缓存
            count++;
            if (count.length > 100) {//保正缓存的大小<=100
                cache[count.shift()];
            }
            return fsb;
        },

        getCache: function () {
            return cache;
        },

        clearSearchBox: function (dsid) {
            if (dsid in cache) {
                //cache[dsid].clearSelection();
            }
        }
    };
};

var cachedSearchBox = CachedSearchBox();
console.log('cache', cachedSearchBox.getCache());
cachedSearchBox.attachSearchBox("input1");
console.log('cache', cachedSearchBox.getCache());
cachedSearchBox.attachSearchBox("input2");
console.log('cache', cachedSearchBox.getCache());
cachedSearchBox.attachSearchBox("input1");
console.log('cache', cachedSearchBox.getCache());

/*
 2实现封装
 可以先来看一个关于封装的例子，在person之外的地方无法访问其内部的变量，而通过提供闭包的形式来访问：
 */

var person = function () {
    //变量作用域为函数内部，外部无法访问
    var name = "default";

    return {
        getName: function () {
            return name;
        },
        setName: function (newName) {
            name = newName;
        }
    }
}();

console.log(person.name);//直接访问，结果为undefined
console.log(person.getName());
person.setName("abruzzi");
console.log(person.getName());

/*
 3.闭包的另一个重要用途是实现面向对象中的对象，传统的对象语言都提供类的模板机制，
 这样不同的对象(类的实例)拥有独立的成员及状态，互不干涉。虽然JavaScript中没有类这样的机制，但是通过使用闭包，
 我们可以模拟出这样的机制。还是以上边的例子来讲
 */

function Person() {
    var name = "default";

    return {
        getName: function () {
            return name;
        },
        setName: function (newName) {
            name = newName;
        }
    }
};

var john = Person();
console.log(john.getName());
john.setName("john");
console.log(john.getName());

var jack = Person();
console.log(jack.getName());
jack.setName("jack");
console.log(jack.getName());



