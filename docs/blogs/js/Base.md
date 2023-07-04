---
title: JavaScript基础
date: '2023-4-27'
---

## 数据类型

- 原始类型 （基本类型）
  - string
  - number
  - boolean
  - null
  - undefined
  - symbol（es6新增）

- 对象类型 （引用类型）
  - object

::: tip 提示
1.两者的区别在于，对象类型存储的是地址，而原始类型存储的是值。

2.在js中除了原始类型，其他的都是对象类型，像 Array，Function，Date，RegExp等等不在其它六种简单数据类型之外的数据，都属于 object
:::

## 判断数据类型常用方法

### typeof

::: tip 提示
`typeof` 能准确判断除 `null` 以外的原始类型的值，对于对象类型，除了函数会判断成 `function` ，其他对象类型一律返回 `object`
:::

```js
  typeof 123 // number
  typeof '123' // string
  typeof true // boolean
  typeof undefined // undefined
  typeof null // object
  typeof Symbol() // symbol
  typeof {} // object
  typeof {name: 'Hello'} // object
  typeof [] // object
  typeof [1,2,3] // object
  typeof alert // function
  typeof new Date() // object
  typeof new RegExp() // object

```

### instanceof

::: tip 提示
`instanceof` 判断对象类型 后面一定要是对象类型，并且大小写不能错，该方法适合一些条件选择或分支。（通过原型链判断）
:::

```js
  [1,2,3] instanceof Array // true
  new Date() instanceof Date // true
  new Function() instanceof Function // true
  null instanceof Object // false
```

### Object.prototype.toString.call()

::: tip 提示
对象原型链判断方法，适用于所有类型的判断检测,注意区分大小写.toString方法,在Object原型上返回数据格式
:::

```js
  Object.prototype.toString.call(123) // [object Number]
  Object.prototype.toString.call('123') // [object String]
  Object.prototype.toString.call(true) // [object Boolean]
  Object.prototype.toString.call(undefined) // [object Undefined]
  Object.prototype.toString.call(null) // [object Null]
  Object.prototype.toString.call(Symbol()) // [object Symbol]
  Object.prototype.toString.call({}) // [object Object]
  Object.prototype.toString.call({name: 'Hello'}) // [object Object]
  Object.prototype.toString.call([]) // [object Array]
  Object.prototype.toString.call([1,2,3]) // [object Array]
  Object.prototype.toString.call(alert) // [object Function]
  Object.prototype.toString.call(new Date()) // [object Date]
  Object.prototype.toString.call(/\d/) // [object RegExp]
```

## new构造的过程

1.创建一个对象

2.原型绑定

3.this绑定

4.返回新对象

## this指向

优先级从高到低

1.`new构造函数`调用，`this`指向永远是构造函数返回的示例上

2.箭头函数没有`this`，箭头函数里的`this`为父级作用域的上下文，谁调用指向谁

3.`call()`、`apply()`和`bind()`改变上下文的方法，`this`指向取决于这些方法的第一个参数，当第一个参数为`null`时，`this`指向全局对象`window`

4.对象调用，例如`obj.foo()`，`this`指向调用对象`obj`

5.独立函数调用，例如`foo()`，this指向全局对象`window`

```js
var name = 'global name';
var foo = function() {
  console.log(this.name);
}
var Person = function(name) {
  this.name = name;
}
Person.prototype.getName = function() {
  console.log(this.name);
}
var obj = {
  name: 'obj name',
  foo: foo
}
var obj1 = {
  name: 'obj1 name'
}

// 独立函数调用，输出：global name
foo();
// 对象调用，输出：obj name
obj.foo();
// apply()，输出：obj1 name
obj.foo.apply(obj1);
// new 构造函数调用，输出：p1 name
var p1 = new Person('p1 name');
p1.getName();
```

常见的this指向

- 全局作用域中或者普通函数中`this`指向全局对象`window`
- 立即执行函数`this`必定指向`window`
- 定时器`this`指向`window`
- 事件中`this`指向`事件源对象`
- 方法中谁调用就指向谁
- 构造函数中`this`指向`对象实例`

<img :src="$withBase('/image/js_part_1.png')" alt="avatar">

## 原型与原型链

::: tip 提示
  原型的本质是对象
:::
所有的函数都有原型熟悉`prototype`，默认情况下`prototype`是个对象，所有的对象都有一个隐式原型`_proto_`的属性，指向其创建对象的构造函数的原型`prototype`

由于原型`prototype`也是一个对象，他也有隐式原型，他的指向也不变，一路的查找形成了链式结构

## 闭包

::: tip 提示
  闭包由一个变量和一个内部可以访问都变量的函数组成
:::

## 深、浅拷贝

::: tip 提示
深拷贝和浅拷贝最根本的区别在于是否真正获取一个对象的复制实体，而不是引用。
:::

浅拷贝（shallowCopy）只是增加了一个指针指向已存在的内存地址，

深拷贝（deepCopy）是增加了一个指针并且申请了一个新的内存，使这个增加的指针指向这个新的内存

::: tip 浅拷贝实现方式
1.利用`Object.assign()`方法

2.利用`...`扩展运算符
:::

::: tip 深拷贝拷贝实现方式
1.配合使用`JSON.parse()`和`JSON.stringify()`两个函数

2.实现自己的简易深拷贝方法

3.`lodash`第三方库实现深拷贝
:::

## 继承
