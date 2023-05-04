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

```bash
  // 取一个你喜欢的名字
  mkdir blog
  cd blog
  // 初始化
  npm init
```

途中一路回车即可，得到一个只有 `package.json` 的blog文件夹：

```md
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

```bash
  npm install vuePress -d
```

创建第一篇文章，先创建一个docs文件夹，以及一个 `README.md` 文件。该文件类似于vue项目下的 `index.vue` 页面。并写入hello World为文章内容：

```bash
  // 此时是在blog目录下
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

```bash
  npm run docs:dev
```

启动完成，端口默认为8080。

在浏览器输入 <http://localhost:8080/>

此处会遇到一个问题--展示乱码

| 正确的展示 | 乱码的展示 |
| :------: | :------: |
| <img :src="$withBase('/image/problem_1.png')" alt="avatar"> | <img :src="$withBase('/image/problem_2.png')" alt="avatar"> |

原因是md文件编码格式错误

| 正确的格式 | 引起乱码的格式 |
| :------: | :------: |
| <img :src="$withBase('/image/problem_3.png')" alt="avatar"> | <img :src="$withBase('/image/problem_4.png') |

## 基础配置

创建一个.vuepress的文件夹，存放所有配置相关的文件，以及一个 `config.js` 文件，此时的目录结构如下：

```md
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

<img :src="$withBase('/image/part_1.png')" alt="avatar">

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

<img :src="$withBase('/image/part_2.png')" alt="avatar">

更多配置请参考[导航栏配置](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F)

### 3.添加侧边栏

在添加侧边栏之前，先添加一些md文件：

```md
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

<img :src="$withBase('/image/part_3.png')" alt="avatar">

至此一个网页的基本形态也就搭建完成了。

### 4.添加主题

基本功能已经实现，但是要实现loading，切换等效果这些还不够，引入主题帮助实现高级功能，这里推荐使用 `vuepress-theme-reco` ：

```bash
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

<img :src="$withBase('/image/part_4.png')" alt="avatar">

点击画板，可以切换模式，具体自行体验。

### 5.修改主题色

VuePress默认是绿色，可以修改成自己喜欢的颜色。在.vuepress目录下创建styles文件夹以及 `palette.styl` 文件：

```md
  D:\blog\docs\.vuepress
  ├─config.js
  ├─styles
  |   └palette.styl
```

设置主题色：

```css
  $accentColor = #0093dd // 主题颜色
```

效果如下:

<img :src="$withBase('/image/part_5.png')" alt="avatar">

更多配置请参考[palette.styl](https://vuepress.vuejs.org/zh/config/#palette-styl)

### 6.自定义样式

可以看到刚刚黑夜模式下，用于强调作用的文件，显示不清晰，可以通过修改样式进行调整。在刚刚styles的目录下，创建 `index.styl` 的文件：

```md
  D:\blog\docs\.vuepress
  ├─config.js
  ├─styles
  |   ├─index.styl
  |   └palette.styl
```

添加样式代码：

```css
  // 处理用作强调的文字颜色在暗黑模式下看不清楚
  .dark .content__default code {
    background-color: rgba(58,58,92,0.7);
    color: #fff;
  }
```

修改后效果如下:

<img :src="$withBase('/image/part_6.png')" alt="avatar">

### 7.添加文章信息

可以看到part_1页面出现了两个标题，这是因为 `vuepress-theme-reco` 主题默认取第一个一级标题作为文章的标题，我们可以修改一下文章的信息：

```md
  // 在md文件顶部添加
  ---
  title: CSS第一篇
  author: chengyisan
  date: '2023-4-18'
  ---
```

效果如下:

<img :src="$withBase('/image/part_7.png')" alt="avatar">

如果author作者信息不想每个文档都写，也可以在 `config.js` 中添加，后续在 `config.js` 配置中统一添加。

也可以在index.styl设置隐藏文章信息

```css
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
| <img :src="$withBase('/image/part_8.png')" alt="avatar"> | <img :src="$withBase('/image/part_9.png')" alt="avatar"> | <img :src="$withBase('/image/part_10.png')" alt="avatar"> |

至此一个网页的基础升级版也搭建完成了。

## Github.io部署

首先在Github上新建一个仓库，这里取名blog：

<img :src="$withBase('/image/part_11.png')" alt="avatar">

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

然后在blog目录下建立 `deploy.sh` 文件：

```bash
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

新建终端，此处以vscode为例，执行 `sh deploy.sh`，项目就会开始构建，并最终推送到 `gh-pages` 分支：

<img :src="$withBase('/image/part_12.png')" alt="avatar">

最终我们可以在仓库的 Settings -> Pages 中看到最后的地址。

<img :src="$withBase('/image/part_13.png')" alt="avatar">

最后生成的地址：<https://chengyisan.github.io/blog/>

至此，我们完成了 VuePress 和 Github Pages 的部署。

## 一些补充

### 1.组件的引用

因为VuePress会自动识别 `components` 文件夹内的所有组件并自动注册，我们在对应的页面直接使用即可。举个例子，在 `components`目录下创建 `demo.vue` 文件：

```md
  D:\blog\docs\.vuepress
  ├─config.js
  ├─styles
  |   ├─index.styl
  |   └palette.styl
  ├─components
  |     └demo.vue
```

内容就写hello css：

```vue
  // demo.vue
  <template>
    <div class="demo">
      hello css
    </div>
  </template>
```

在 `part_2.md` 中亦如在vue文件中直接引用组件名称：

```md
  // part_2.md
  <demo />
```

<img :src="$withBase('/image/part_14.png')" alt="avatar">

### 2.自定义主题

除了使用vuepress-theme-reco作为主题，我们还可以使用自定义的主题进行页面展示，例如 `elementUI`，在.vuepress目录下添加 `enhanceAPP.js` 文件：

```md
  D:\blog\docs\.vuepress
  ├─.vuepress
  |     ├─config.js
  |     ├─enhanceApp.js
  |     ├─styles
  |     |   ├─index.styl
  |     |   └palette.styl
  |     ├─components
  |     |     └demo.vue
```

```js
  // enhanceAPP.js
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  export default ({
    Vue,
    options,
    router
  }) => {
    Vue.use(ElementUI)
  }
```

在VuePress中应该就可以使用 `elementUI` 里边的组件了。可是启动项目后发现页面白屏且控制台会报这样的错误，`Cannot find module 'core-js/library/fn/xxx/xxx'`：

<img :src="$withBase('/image/problem_5.png')" alt="avatar">

经过查询发现原因应该是UI组件中依赖的core-js包和VuePress所依赖的core-js包版本不兼容造成的。大佬附带了解决方案，需要在配置文件 `config.js` 中进行如下配置：

```js
module.exports = {
  ...
  theme: "reco",
  chainWebpack: config => {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features')
  }
};
```

在 `part_2.md` 中添加一个按钮

```md
  // part_2.md
  <demo />
  <el-button type="primary">出发</el-button>
```

<img :src="$withBase('/image/part_15.png')" alt="avatar">

### 3.引入less

既然引入了 `elementUI` ,那就可以引入less进行样式修改了，安装依赖：

```bash
  npm i -D less-loader less
```

发现启动直接报错：

<img :src="$withBase('/image/problem_7.png')" alt="avatar">

解决方法：
3-1.less-loader版本过高，建议卸载，重新安装 `less-loader@7.3.0`；
3-2.将项目的 `node_modules` 和 `package-lock.json` 删除，执行命令：`npm cache clean --force`，然后重新 `npm install` 即可。

修改组件 `demo.vue` ：

```vue
  // demo.vue
  <template>
    <div class="demo">
      hello css
    </div>
  </template>
  <style lang="less" scoped>
  .demo {
    background: #0093dd;
  }
  </style>
```

<img :src="$withBase('/image/part_16.png')" alt="avatar">

### 4.首页配置

首先vuepress-theme-reco给我们提供了一套blog形式的主题，只需修改 `config.js` 即可，同时在.vuepress目录下创建 `public` 文件夹，用于存放静态资源，这里存放一张图片，作为头像：

```md
  D:\blog\docs\.vuepress
  ├─config.js
  ├─enhanceApp.js
  ├─styles
  |   ├─index.styl
  |   └palette.styl
  ├─public
  |   └avatar.png
  ├─components
  |     └demo.vue
```

```js
module.exports = {
  ...
  themeConfig: {
    author: "chengyisan",
    authorAvatar: '/avatar.png',
    type: 'blog'
    ...
  }
  ...
};
```

同时修改 `docs/README.md` 文件：

```md
  ---
  home: true
  ---
  <!-- # Hello World -->
```

重启服务，就可以看到如下效果，页面中的文字默认会采用 `config.js` 中的 `title` 和 `description`：

<img :src="$withBase('/image/part_17.png')" alt="avatar">

滚动滚动条之后的效果：

<img :src="$withBase('/image/part_18.png')" alt="avatar">

继续修改 `docs/README.md` 文件：

```md
  ---
  home: true
  heroImage: "/avatar.png"
  heroText: chengyisan
  heroImageStyle:
    {
      maxHeight: "288px",
      display: block,
      borderRadius: "19% 81% 23% 77% / 44% 57% 43% 56%",
      boxShadow: "0 15px 18px rgba(0,0,0,0.2)",
    }
  ---
```

最后的效果：

<img :src="$withBase('/image/part_19.png')" alt="avatar">

更多配置参考[首页配置](https://vuepress-theme-reco.recoluan.com/views/1.x/home.html)

既然引入了less，我们就可以改造一下我们的首页了。比如通过使用自定义组件来展示，首页在 `.vuepress/components` 目录下创建 `BlogHome.vue` 文件：

```md
  D:\blog\docs\.vuepress
  ├─config.js
  ├─enhanceApp.js
  ├─styles
  |   ├─index.styl
  |   └palette.styl
  ├─public
  |   └avatar.png
  ├─components
  |     ├─BlogHome.vue
  |     └demo.vue
```

简单写一些内容：

```vue
  // BlogHome.vue
  <template>
    <div class="home-container">
      <img :src="imageSrc" alt="" srcset="">
    </div>
  </template>

  <script>
  export default {
    name: 'BlogHome',
    data () {
      return {
        pcImageSrc: '/home/home-background-pc.jpg',
        mobileImageSrc: '/home/home-background-mobile.jpg',
        deviceType: null,
      }
    },
    computed: {
      imageSrc() {
        return this.deviceType === 'pc' ? this.$withBase(this.pcImageSrc) : this.$withBase(this.mobileImageSrc)
      }
    },
    mounted() {
      this.detectDeviceType();
      window.addEventListener('resize', () => {
        this.detectDeviceType();
      })
    },
    methods: {
      detectDeviceType() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          this.deviceType = 'mobile';
        } else {
          this.deviceType = 'pc';
        }
      },
    },
    beforeDestroy() {
      window.removeEventListener('resize', () => {
        this.detectDeviceType();
      });
    },
  }
  </script>

  <style lang="less" scoped>
  .home-container {
    display: flex;
    align-content: center;
    justify-content: center;
    img {
      // 3.6rem头部高度
      margin-top: 3.6rem;
      width: 100%;
      max-width: 965px;
    }
  }
  </style>
```

修改 `config.js` 文件，将刚刚上述添加的 `authorAvatar` 属性注释，同时将 `type` 改完组件名称  `BlogHome`：

```js
module.exports = {
  ...
  themeConfig: {
    author: "chengyisan",
    // authorAvatar: '/avatar.png',
    type: 'BlogHome'
    ...
  }
  ...
};
```

重启服务，就可以看到如下效果：

<img :src="$withBase('/image/part_20.png')" alt="avatar">
