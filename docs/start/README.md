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

途中一路回车即可，得到一个只有 `package.json` 的blog文件夹：

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

创建第一篇文章，先创建一个docs文件夹，以及一个 `README.md` 文件。该文件类似于vue项目下的 `index.vue` 页面。并写入hello World为文章内容：

```md
  // 此时是在blog文件夹内
  mkdir docs
  echo '# Hello World' > docs/README.md
```

同时在 `package.json` 文件中添加启动命令：

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

创建一个.vuepress的文件夹，存放所有配置相关的文件，以及一个 `config.js` 文件，此时的目录结构如下：

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

为了SEO，在 `config.js` 添加：

```js
  module.exports = {
    title: "XXX的网页",
    description: "菜鸟的尝试",
  }
```

此时的页面：

![avatar](/image/part_1.png)

### 2.添加导航栏

在右上角添加导航，修改 `config.js` ：

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

在添加侧边栏之前，先添加一些md文件：

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
  module.exports = {
    ...
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
            { title: "part2", path: "/CSS_PART/part_2" }
          ]
        }
      ]
    }
  }
```

对应效果如下：

![avatar](/image/part_3.png)

至此一个网页的基本形态也就搭建完成了。

### 4.添加主题

基本功能已经实现，但是要实现loading，切换等效果这些还不够，引入主题帮助实现高级功能，这里推荐使用 `vuepress-theme-reco` ：

```
  npm install vuepress-theme-reco --save -dev
```

同时在 `config.js` 中引用主题

```js
  module.exports = {
    ...
    themeConfig: {
      nav: [...],
      sidebar: [...]
    },
    theme: "reco"
  }
```

对应效果如下：

![avatar](/image/part_4.png)

点击画板，可以切换模式，具体自行体验。

### 5.修改主题色

VuePress默认是绿色，可以修改成自己喜欢的颜色。在.vuepress文件夹创建styles文件夹以及 `palette.styl` 文件：

```
  D:\blog\docs\.vuepress
  ├─config.js
  ├─styles
  |   └palette.styl
```

设置主题色：

```style
  $accentColor = #0093dd // 主题颜色
```

效果如下:

![avatar](/image/part_5.png)

更多配置请参考[palette.styl](https://vuepress.vuejs.org/zh/config/#palette-styl)

### 6.自定义样式

可以看到刚刚黑夜模式下，用于强调作用的文件，显示不清晰，可以通过修改样式进行调整。在刚刚styles的文件夹下，创建 `index.styl` 的文件：

```
  D:\blog\docs\.vuepress
  ├─config.js
  ├─styles
  |   ├─index.styl
  |   └palette.styl
```

添加样式代码：

```style
  // 处理用作强调的文字颜色在暗黑模式下看不清楚
  .dark .content__default code {
    background-color: rgba(58,58,92,0.7);
    color: #fff;
  }
```

修改后效果如下:

![avatar](/image/part_6.png)

### 7.添加文章信息

可以看到part_1页面出现了两个标题，这是因为 `vuepress-theme-reco` 主题默认取第一个一级标题作为文章的标题，我们可以修改一下文章的信息：

```
  // 在md文件顶部添加
  ---
  title: CSS第一篇
  author: chengyisan
  date: '2023-4-18'
  ---
```

效果如下:

![avatar](/image/part_7.png)

如果author作者信息不想每个文档都写，也可以在 `config.js` 中添加，后续在 `config.js` 配置中统一添加。

也可以在index.styl设置隐藏文章信息

```style
  .page .page-title {
    display: none;
  }
```

### 8.config.js配置

上面我们提示作者信息可以在 `config.js` 中统一配置：

```js
  module.exports = {
    ...
    themeConfig: {
      author: "chengyisan",
      nav: [...],
      sidebar: [...]
    },
    theme: "reco"
  }
```

同时我们看到文章中的时间显示格式4/18/2023和我们书写的格式2023-4-18是不一致，这是因为VuePress的默认语言是en-us，只需设置一下语言即可，设置后显示就变成了2023/4/18：

```js
  module.exports = {
    ...
    locales: {
      "/": {
        lang: "zh-CN",
      },
    },
    themeConfig: {
      author: "chengyisan",
      nav: [...],
      sidebar: [...]
    },
    theme: "reco"
  }
```

没有使用vuepress-theme-reco之前文章的多级标题会展示在左侧导航栏，但是vuepress-theme-reco会默认移除这些标题，同时在右侧显示子侧边栏，需要的话可以全局开启：

```js
  module.exports = {
    ...
    locales: {
      "/": {
        lang: "zh-CN",
      },
    },
    themeConfig: {
      author: "chengyisan",
      nav: [...],
      sidebar: [...],
      subSidebar: "auto", // 二级标题会在右侧生成导航栏
    },
    theme: "reco"
  }
```

| 未使用主题 | 使用主题不开启子侧边栏 | 使用主题开启子侧边栏 |
| :------: | :------: | :------: |
| ![avatar](/image/part_8.png) | ![avatar](/image/part_9.png) | ![avatar](/image/part_10.png) |

至此一个网页的基础升级版也搭建完成了。

## Github.io部署

首先在Github上新建一个仓库，这里取名blog：

![avatar](/image/part_11.png)

同时在 `config.js` 里面增加一个base路径的配置：

```js
  module.exports = {
    ...
    // 和仓库名保持一致
    base: "/blog/",
    themeConfig: {...},
    ...
  }
```

截至目前的 `config.js` 配置：

```js
  module.exports = {
    title: "XXX的网页",
    description: "菜鸟的尝试",
    base: "/blog/",
    locales: {
      "/": {
        lang: "zh-CN",
      },
    },
    themeConfig: {
      author: "chengyisan",
      nav: [
        { text: "首页", link: "/" },
        {
          text: "关于我",
          // 这里是下拉列表展现形式
          items: [
            { text: "掘金", link: "https://juejin.cn/user/1121946905352599" },
            { text: "Github", link: "https://github.com/Pine-Nuts" },
          ],
        },
      ],
      sidebar: [
        // 单侧边栏
        {
          title: "欢迎光临",
          path: "/", // 点击父级节点是否跳转
          collapsable: true, // 是否折叠
          children: [{ title: "开心一下", path: "/" }],
        },
        {
          title: "CSS",
          // path: "/CSS_PART/part_1", // 不跳转
          collapsable: false, // 是否折叠
          children: [
            { title: "part1", path: "/CSS_PART/part_1" },
            { title: "part2", path: "/CSS_PART/part_2" },
          ],
        },
      ],
      subSidebar: "auto", // 二级标题会在右侧生成导航栏
    },
    theme: "reco",
  };
```

然后在blog文件夹下建立 `deploy.sh` 文件：

```
  #!/usr/bin/env sh

  # 确保脚本抛出遇到的错误
  set -e

  # 生成静态文件
  npm run docs:build

  # 进入生成的文件夹
  cd docs/.vuepress/dist

  git init
  git add -A
  git commit -m 'deploy'

  # 如果发布到 https://<USERNAME>.github.io/<REPO>
  git push -f git@github.com:chengyisan/blog.git master:gh-pages

  cd -
```

新建终端，此处以vscode为例，执行sh deploy.sh，项目就会开始构建，并最终推送到gh-pages分支：

![avatar](/image/part_12.png)

最终我们可以在仓库的 Settings -> Pages 中看到最后的地址。

![avatar](/image/part_13.png)

最后生成的地址：<https://chengyisan.github.io/blog/>

至此，我们完成了 VuePress 和 Github Pages 的部署。

## 一些补充

### 1.全局组件的引用
