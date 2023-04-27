---
title: CSS相关
date: '2023-4-26'
---
# CSS布局

标准文档流指的是元素排版布局过程中，元素会默认自动从左往右，从上往下的流式排列方式。最终窗体自上而下分成一行行，并在每行中从左至右的顺序排放元素。

## 一、布局方式

### 1.盒子内部的布局

- [文本布局](#_1-文本布局)
- [盒子本身布局](#_2-盒子本身布局)

### 2.盒子之间的布局

- 脱离标准文档流下的盒子的布局
  - [浮动布局](#_1-浮动布局)
  - [定位布局](#_2-定位布局)
- 标准文档流下的盒子的布局
  - 块级格式化上下文( Block Formatting Context )
  - 行内格式化上下文( Inline formatting contexts )
  - 自适应格式化上下文( Flex Formatting Contexts )
  - 网格布局格式化上下文( GridLayout Formatting Context )
  - 表格布局上下文( Table Formatting Context )

## 二、盒子内部的布局

### 1.文本布局

<div style="background: darkorange;text-align: center;padding: 4px 24px 24px;">
  margin
  <div style="background: cornflowerblue;padding: 4px 24px 24px;">
    border
    <div style="background: lightgreen;padding: 4px 24px 24px;">
      padding
      <div style="background: mediumpurple;border-bottom: 1px #111 solid;">line-boxes</div>
      <div style="background: mediumpurple;">line-boxes</div>
    </div>
  </div>
</div>

- 存在一个看不见的 line boxes 包裹每行文字。
- line boxes 的高度取决于 line-height。
- 通过 line-height 可以设置单行文本的垂直居中。

### 2.盒子本身布局

盒子由内容(content)、内边距(padding)、边框(border)、外边距(margin)构成。
盒模型有两种标准，一个是标准盒模型(content-box)，一个是 IE 盒模型(border-box)。

<img :src="$withBase('/image/css_part_1.png')" alt="avatar">

标准盒模型高度仅是内容的高度，宽度也仅是内容的宽度。

<img :src="$withBase('/image/css_part_2.png')" alt="avatar">

IE 盒模型高度仅是内容的高度 + padding + border，宽度也仅是内容的宽度 + padding + border。

## 三、盒子之间的布局

### 1.浮动布局

**float：left/right/none**

css 浮动就是浮动元素会脱离文档流，根据 float 的值向左或向右移动，直到它的外边界碰到父元素的内边界或另一个浮动元素的外边界为止。
当把框 1 向右浮动时，它脱离文档流并且向右移动，直到它的右边缘碰到包含框的右边缘。

<img :src="$withBase('/image/css_part_3.png')" alt="avatar">

**浮动的影响**

- 不会影响未浮动的块级元素布局，但会影响内联元素的布局。
- 浮动后的元素可以设置宽度和高度，也就是说内联元素浮动后会变成块级元素。
- 因为浮动元素脱离了文档流，会出现一种高度坍塌的现象：原来的父容器高度是当前盒子撑开的，但是当当前盒子浮动后，脱离文档流浮动起来，那父容器的高度就坍塌。
- 元素浮动之后，会让它跳出文档流，当它后面还有元素时，其他元素会无视它所占据了的区域，直接在它身下布局。但是文字、图片、表单标签依然会为这个标签让出位置，会认同浮动元素所占据的区域，围绕它布局，也就是没有脱离文本流。

**清除浮动**

- clear 清除浮动（添加空div法）在浮动元素下方添加空div，并给该元素写css样式： **{clear:both;height:0;overflow:hidden;}**
- 万能清除法 ::after 伪类清浮动（推荐使用）**::after{content: '';display: block;clear:both}**

### 2.定位布局

**position：static/relative/absolute/fixed**

通过设置元素的 position 属性，可以让元素处于定位布局中，并通过 left、right、top、bottom 属性设置元素具体的偏移量。

**四种定位布局**

- **static** 静态定位，实际上所有元素默认都是静态定位的，即处于标准流中。
- **relative** 相对定位，元素保留在标准流中所占用的位置，但实际是边框及以内的部分将显示在偏移之后的位置。在相对定位中，实际上元素并未脱离标准流，所以浏览器还是会区分它是否是块级或其他类型的元素。另外设置元素的 margin 属性，实际上 margin 区域会出现在元素定位之前的位置。
- **absolute** 绝对定位，元素脱离标准流，浏览器把它视作块级元素，不论定位之前它是何种元素，其他元素也将无视它。绝对定位的偏移量是相对于其有定位属性的第一个祖先元素的，另外绝对定位的元素会自动忽略有定位属性的祖先元素的 padding 属性。
- **fixed** 固定定位，固定定位和绝对定位相似，但它的偏移量固定的相对于浏览器窗口，它会脱离标准文档流，并且浏览器把他们一致视作块级元素。

通常情况下，元素的 z-index 属性值都是 0 ，并且定位布局中的元素会覆盖标准流中的元素，同在定位布局中的元素，写在后面的会覆盖写在前面的元素。在定位布局中，可以设置它们的 z-index 属性来调整它们的覆盖关系，并且谁的值越大，显示优先级越高。如果定位元素的父元素也设置了 z-index 属性，那么子元素的 z-index 属性将失效，并且最终是根据父元素的 z-index 属性来判断覆盖关系。
