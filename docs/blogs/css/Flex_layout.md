---
title: Flex布局
date: '2023-4-27'
---

<!-- # Flex布局 -->

flex 是 Flexible Box 的缩写，意为"弹性布局"。指定容器display: flex即可。容器有以下属性：flex-direction，flex-wrap，flex-flow，justify-content，align-items，align-content。

- flex-direction属性决定主轴的方向
- flex-wrap属性定义，如果一条轴线排不下，如何换行
- flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
- justify-content属性定义了项目在主轴上的对齐方式
- align-items属性定义项目在交叉轴上如何对齐
- align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

子元素也有一些属性：order，flex-grow，flex-shrink，flex-basis，flex，align-self

- order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0
- flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
- flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
- flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）
- flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto，后两个属性可选
- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch
