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

:::tip
1.两者的区别在于，对象类型存储的是地址，而原始类型存储的是值。

2.在js中除了原始类型，其他的都是对象类型，像 Array，Function，Date，RegExp等等不在其它六种简单数据类型之外的数据，都属于 object
:::

## 判断数据类型常用方法

### typeof

:::tip
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

:::tip
`instanceof` 判断对象类型 后面一定要是对象类型，并且大小写不能错，该方法适合一些条件选择或分支。（通过原型链判断）
:::

```js
  [1,2,3] instanceof Array // true
  new Date() instanceof Date // true
  new Function() instanceof Function // true
  null instanceof Object // false
```

### Object.prototype.toString.call()

:::tip
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

## 类型转换

## 原型与原型链
