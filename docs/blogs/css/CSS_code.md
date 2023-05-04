---
title: CSS_code
date: '2023-5-04'
---

记录一些常用的css代码

## 实现水平垂直居中

### 1.已知宽高

a.设置父元素为相对定位，给子元素设置绝对定位：

```css
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
```

b.设置父元素为相对定位，给子元素设置绝对定位：

```css
  left: 50%;
  top: 50%;
  margin-left: 元素负一半宽度px;
  margin-top: 元素负一半高度px;
```

### 2.未知宽高

a.设置父元素为相对定位，给子元素设置绝对定位：

```css
  left: 50%;
  top: 50%;
  // （X,Y轴偏移）
  transform: translateX(-50%) translateY(-50%);
```

b.设置父元素为flex定位：

justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。
align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。

```css
  justify-content: center;
  align-items: center;
```

## 实现左右定宽，中间自适应

### 1.使用浮动

先渲染左右两个元素，分别让他们左右浮动，然后再渲染中间元素，设置它的margin左右边距分别为左右两个元素的宽度。

### 2.使用定位方式

把左右两个元素分别使用绝对定位，left:0;right:0;中间元素设置margin左右边距为左右两个元素的宽度即可。

### 3.使用flex方式

## 实现0.5高度的线

```css
  height: 1px;
  background-color: red;
  transform: scale(0.5);
  // （防止虚化）
  transform-origin: 50% 100%;
```

0.5px高度
<div style="height: 1px;
  background-color: red;
  transform: scale(0.5);
  transform-origin: 50% 100%"></div>

1px高度
<div style="height: 1px; margin-top: 8px;
  background-color: red"></div>

::: tip 提示
  scale 缩小，原占用空间不会改变
:::

## 实现一个三角形

### 1.标签实现

<div style="width: 0;height: 0;border: 10px solid transparent;border-bottom-color: red; display: inline-block"></div>

```css
  div {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: red;
  }
```

### 2.伪类实现

<div style="height: 20px;">
  <div id="code_triangle" style="position: relative; "></div>
</div>
<style>
  #code_triangle:before{
    content: "";
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: #CCCCCC;
    position: absolute;
  }
</style>

```css
  div{ position: relative }
  div:before{
    content: "";
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: #CCCCCC;
    position: absolute;
  }
```

| 朝上 | 朝右 | 朝下 | 朝左 |
| :------: | :------: | :------: | :------: |
| <div style="width: 0;height: 0;border: 10px solid transparent;border-bottom-color: red; display: inline-block"></div> | <div style="width: 0;height: 0;border: 10px solid transparent;border-left-color: red;display: inline-block"></div> | <div style="width: 0;height: 0;border: 10px solid transparent;border-top-color: red;display: inline-block"></div> | <div style="width: 0;height: 0;border: 10px solid transparent;border-right-color: red;display: inline-block"></div> |
| border-bottom-color: red; |border-left-color: red; | border-top-color: red; | border-right-color: red; |

::: tip 提示
  综上不难发现，总体思路就是通过设置边框的高度和颜色来实现三角形，即设置一定高度的border，将border四面除了底边对应的方向设置具体颜色其余设置透明色来实现。
:::

## 实现文本溢出省略号效果

### 1.单行

```css
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  display: block;
```

### 2.多行

```css
  display: -webkit-box;
  -webkit-box-orient: vertical;
  // 行数
  -webkit-line-clamp: 3;
  overflow: hidden;
```
