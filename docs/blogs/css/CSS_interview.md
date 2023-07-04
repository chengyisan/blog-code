---
title: CSS_interview
date: '2023-5-08'
---

记录一些常用的css面试题

### 实现水平垂直居中

### margin的叠加规则

::: tip 提示
  margin重叠的计算规则
  a、正正取大值
  b、正负值相加
  c、负负取最负
:::

#### 水平方向

水平方向不会发生多个div的margin重叠的现象，不做讨论。

#### 垂直方向

1、同级关系margin重叠

解决方案：

- float:left | right
- display:inline-block;

2、父子关系margin重叠

解决方案：

- 给父级加   overflow:hidden;
- 给父级加   padding-top:1px;
- 给父级加   border:1px solid transparent;
- 给子级加   position:absolute;

### rgba()和opacity区别

rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内的所有的元素的透明度，而rgba()只作用于元素字体的颜色或其背景色。

::: tip 提示
  设置rgba()透明的元素的子元素不会继承透明效果
:::
