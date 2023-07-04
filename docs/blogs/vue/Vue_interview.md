---
title: Vue_interview
date: '2023-5-23'
---

记录一些常用的Vue面试题

## 千万级数据不使用响应式一次加载

将数据存储在一个纯粹的JavaScript对象中，然后将这个对象传入Vue实例或组件中。

假设有一个名为userList的数组，包含千万级的用户数据，如下所示：

```js
var userList = [ /* 千万级用户数据 */ ]
```

如果使用响应式将这个数组传入Vue实例或组件中，会导致Vue对这个数组进行逐个遍历，并为每个元素添加getter和setter方法，这会导致非常大的性能开销。

```js
new Vue({
  data: {
    userList: userList
  }
})
```

为了避免这种情况，可以将userList存储在一个纯粹的JavaScript对象中，然后通过props将这个对象传入组件中：

```js
var dataObj = { userList: userList }

new Vue({
  template: '<my-component :dataObj="dataObj"></my-component>',
  data: {
    dataObj: dataObj
  },
  components: {
    'my-component': {
      props: ['dataObj'],
      template: '<div>{{ dataObj.userList }}</div>'
    }
  }
})

```

这样做可以将dataObj作为整个Vue实例的私有数据源，避免了使用响应式带来的性能开销。在数据量过大或数据不需要响应式的情况下，也提高了组件的可重用性和可维护性。

## elementUI二次封装怎么保证原属性不受影响

在进行ElementUI二次封装时，可以通过继承或拓展ElementUI组件的方式来实现。如果只是简单地继承ElementUI组件，那么原有的属性和方法都会被保留。但如果在子组件中对这些属性和方法进行修改，那么可能会影响到父组件或其他调用该组件的地方。

1.使用Object.assign()合并属性

在组件内部可以使用Object.assign()方法将不同的属性合并到一起，这样就可以保留原有属性。例如：

```vue
<template>
  <el-input :value="value" :size="size" :placeholder="placeholder" @input="onInput"></el-input>
</template>

<script>
export default {
  props: ['value', 'size', 'placeholder'],
  methods: {
    onInput(value) {
      this.$emit('input', value)
    }
  },
  mounted() {
    // 合并el-input组件的默认属性和props属性
    const defaultProps = {
      clearable: true
    }
    Object.assign(this.$refs.input.$attrs, defaultProps)
  }
}
</script>
```

2.使用attrs和listeners

在Vue 2.4.0及以上版本中，还可以使用attrs和listeners来保留原有属性和事件。
attrs包含了父组件传递给子组件的所有非props属性，listeners包含了父组件传递给子组件的所有事件监听器。例如：

```vue
<template>
  <el-input v-bind="$attrs" v-on="$listeners"></el-input>
</template>
```

在上面的例子中，我们直接将attrs和listeners传递给了el-input组件，这样就可以保留原有属性和事件。但需要注意的是，
attrs和listeners只在子组件中起作用，如果我们需要在子组件中使用这些属性或事件，需要手动绑定到对应的元素上。

插槽也可通过slots方式传递：

```vue
<template
  v-for="(index, name) in $slots"
  :slot="name"
 >
  <slot :name="name" />
</template>
```

## data为什么函数式而不是对象式

Vue的data属性是函数式而不是对象，是因为这样可以保证每个组件实例都维护一个独立的数据源。如果直接使用一个对象作为data属性，那么在多个组件实例中共享数据时，就会出现数据相互影响的问题。而使用函数式的形式定义data属性，可以保证每个组件实例都有自己的独立数据源。

具体来说，当Vue创建组件实例时，会调用data函数，生成一个新的数据对象，然后将这个数据对象复制一份，作为组件实例的私有数据对象。这样一来，每个组件实例都有自己的私有数据对象，从而避免了数据相互影响的问题。

例如，如果有一个组件定义如下：

```js
Vue.component('my-component', {
  data: function () {
    return {
      message: 'Hello',
      counter: 0
    }
  },
  template: '<div><p>{{ message }}, World!</p><button @click="increment">Increment</button></div>',
  methods: {
    increment: function () {
      this.counter += 1
    }
  }
})
```

那么每个my-component组件实例都会有自己的message和counter属性，互不干扰。这样做可以保证数据的独立性，提高组件的可重用性和可维护性。

## Vue为什么不推荐直接操作dom

1.不符合Vue的设计理念：Vue是一种声明式的框架，它的核心思想是让开发者将精力集中在数据层面，而不是DOM操作上。Vue通过数据驱动视图的方式，将DOM操作抽象成一个响应式系统，以此来避免了直接操作DOM带来的困难和复杂性。

2.可以造成性能问题：直接操作DOM可能会造成性能问题，因为DOM操作是非常耗费性能的。而Vue通过虚拟DOM技术，可以尽可能地减少DOM操作的次数，从而提高应用的性能。

3.可能会导致代码难以维护：直接操作DOM可能会导致代码变得混乱和难以维护，因为DOM操作往往需要在多个组件之间进行传递和共享，这可能会带来许多问题。而Vue通过组件化的方式，将DOM操作封装在组件内部，从而使得代码更加清晰和易于维护。
直接操作DOM会造成性能问题的原因主要有以下几点：

### 为什么会造成性能问题

1. DOM操作是非常耗费性能的：每次对DOM进行操作，都需要重新计算布局、重新渲染，这个过程非常消耗性能。

2. DOM操作会触发重绘和回流：DOM操作会引起浏览器的重绘和回流，这会导致页面重新计算元素的位置和大小，从而降低页面性能。

3. 频繁的DOM操作会导致页面卡顿：如果应用中有大量的DOM操作，就会导致页面变得卡顿，用户体验降低。

综上所述，直接操作DOM会造成性能问题，因此在Vue中，建议使用虚拟DOM技术来减少DOM操作的次数，从而提高应用的性能。虚拟DOM可以将多个DOM操作合并成一个批量更新，从而减少重绘和回流的次数，提高页面性能。

### 为什么会造成代码难以维护

1. 代码难以重用：直接操作DOM会造成代码的重用性变差，因为DOM操作往往需要在多个组件之间进行传递和共享，这可能会带来许多问题。

2. 代码可读性降低：直接操作DOM的代码往往比较复杂，难以理解和维护，这会导致代码的可读性降低。

3. 容易出现bug：直接操作DOM容易出现各种问题，比如DOM结构发生改变、操作DOM的顺序不对等，这些问题都会导致应用出现bug。

4. 代码难以扩展：直接操作DOM往往会将业务逻辑和DOM操作混在一起，这样会导致代码难以扩展和维护。

综上所述，直接操作DOM会导致代码难以维护，因此在Vue中，建议使用声明式的方式来操作DOM，将DOM操作封装在组件内部，从而使得代码更加清晰和易于维护。使用组件化的方式，可以将DOM操作和业务逻辑分离，从而提高代码的重用性和可读性，降低出现bug的可能性。

## Vue Router 有哪些模式

1. hash 模式：通过 `location.hash` 实现的，URL 中带有 #，如 `http://localhost:8080/#/home`。hash 模式不会向服务器发送请求，可以避免刷新页面时的重复请求，但是会导致 SEO 不友好。

2. history 模式：通过 HTML5 提供的 history API 实现的，URL 中没有 #，如 `http://localhost:8080/home`。history 模式会向服务器发送请求，可能会导致刷新页面时的重复请求，但是可以更好地支持 SEO。

3. abstract 模式：不会对 URL 做任何处理，常用于非浏览器环境下，如服务器渲染和单元测试等场景。

### hash和history的区别

- Hash 模式：URL 中会包含一个 # 符号，如：`http://example.com/#/foo/bar`。在 Hash 模式下，当 URL 改变时，浏览器不会向服务器发出请求，而是只会触发 `hashchange` 事件，通过监听该事件，Vue Router 可以更新页面视图的内容。Hash 模式的优点是兼容性好，而且不需要服务器端特殊配置，缺点是 URL 看起来不那么美观，且不利于 SEO。

- History 模式：URL 中不包含 # 符号，如：`http://example.com/foo/bar`。在 History 模式下，当 URL 改变时，浏览器会向服务器发出请求，服务器需要配置为始终返回 index.html 页面，然后在该页面中通过 JavaScript 根据 URL 来渲染出对应的视图。History 模式的优点是 URL 看起来美观，且有利于 SEO，缺点是需要服务器端配置，且兼容性不如 Hash 模式。
