---
title: 重头开始搭建
date: '2023-4-18'
---

# 前言

:::tip
某日网上冲浪心血来潮想搭建一个博客，最初只是想记录面试过程中遇到的问题和理解，以及平时学习过程中的笔记。
在网上参照[冴羽github](https://github.com/mqyqingfeng/Blog)/[冴羽知乎](https://zhuanlan.zhihu.com/p/489776067)的教程，
搭建了该平台，在此感谢大佬的指点。
:::

记录下搭建的过程和在过程中遇到的问题及找到的解答。

<!-- more -->

## 本地初步搭建

附上官网[VuePress](https://vuepress.vuejs.org/zh/guide/getting-started.html)

首先创建并进入一个文件夹，并进行初始化：

```md
  // 取一个你喜欢的名字
  mkdir blog
  cd blog
  // 初始化
  npm init
```

途中一路回车即可，得到一个只有package.json的blog文件夹：

```
  D:\blog
  ├─package.json
```

```json
  // package.json
  {
    "name": "blog",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
}
```

安装VuePress：

```md
  npm install vuePress -d
```

创建第一篇文章，先创建一个docs文件夹，以及一个readme.md文件。该文件类似于vue项目下的index.vue页面。并写入hello World为文章内容：

```md
  // 此时是在blog文件夹内
  mkdir docs
  echo '# Hello World' > docs/README.md
```

同时在package.json文件中添加启动命令：

```json
  {
    "scripts": {
      "docs:dev": "vuepress dev docs",
      "docs:build": "vuepress build docs"
    }
  }
```

至此框架已初步完成，启动程序：

```md
  npm run docs:dev
```

启动完成，端口默认为8080。

在浏览器输入 <http://localhost:8080/>

此处会遇到一个问题--展示乱码

| 正确的展示 | 乱码的展示 |
| :------: | :------: |
| ![avatar](/image/problem_1.png) | ![avatar](/image/problem_2.png) |

原因是md文件编码格式错误

| 正确的格式 | 引起乱码的格式 |
| :------: | :------: |
| ![avatar](/image/problem_3.png) | ![avatar](/image/problem_4.png) |

## 基础配置

创建一个.vuepress的文件夹，存放所有配置相关的文件，以及一个config.js文件，此时的目录结构如下：

```
  D:\blog
  ├─package-lock.json
  ├─package.json
  ├─docs
  |  ├─README.md
  |  ├─.vuepress
  |  |     └config.js
```

### 1.添加标题和描述

为了SEO，在config.js添加：

```js
  module.exports = {
    title: "XXX的网页",
    description: "菜鸟的尝试",
  }
```

此时的页面：

![avatar](/image/part_1.png)

### 2.添加导航栏

在右上角添加导航，修改config.js：

```js
  module.exports = {
    title: "XXX的网页",
    description: "菜鸟的尝试",
    themeConfig: {
      nav: [
          { text: "首页", link: "/" },
          {
              text: "关于我",
              // 这里是下拉列表展现形式
              items: [
                {text: "掘金", link: "https://juejin.cn/user/1121946905352599"},
                {text: "Github", link: "https://github.com/Pine-Nuts"},
              ]
          }
      ]
    }
  }
```

此时的效果：

![avatar](/image/part_2.png)

更多配置请参考[导航栏配置](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F)

### 3.添加侧边栏

在添加侧边栏之前，先添加一些.md文件：

```
  D:\blog\docs
  ├─README.md
  ├─CSS_PART
  |  ├─part_1.md
  |  └part_2.md
  ├─.vuepress
  |     └config.js
```

```js
  themeConfig: {
    nav: [...],
    sidebar: [ // 单侧边栏
      {
        title: "欢迎光临",
        path: "/", // 点击父级节点是否跳转
        collapsable: true, // 是否折叠
        children: [
          { title: "开心一下", path: "/" }
        ]
      },
      {
        title: "CSS",
        // path: "/CSS_PART/part_1", // 不跳转
        collapsable: false, // 是否折叠
        children: [
          { title: "part1", path: "/CSS_PART/part_1"},
          { title: "part2", path: "/CSS_PART/part_2" },
        ]
      }
    ],
  }
```

对应效果如下：

![avatar](/image/part_3.png)

至此一个网页的基本形态也就搭建完成了。
