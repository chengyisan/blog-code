const moment = require("moment");

module.exports = {
  title: "乘以三",
  description: "乘以三的个人网站",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/blog/",
  // theme: "reco",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    author: "chengyisan",
    logo: "/logo.png",
    // type: "BlogHome",
    lastUpdated: "上次更新",
    nav: [
      { text: "首页", link: "/" },
      { text: "搭建", link: "/start/" },
      { text: "文档",
        // link: "/blogs/",
        items: [
          {
            text: "CSS",
            link: "/blogs/CSS/",
          },
          {
            text: "JavaScript",
            link: "/blogs/JS/",
          },
          {
            text: "VUE",
            link: "/blogs/Vue/",
          },
        ]
      },
      {
        text: "关于我",
        // 这里是下拉列表展现形式
        items: [
          {
            text: "掘金",
            link: "https://juejin.cn/user/1121946905352599",
            icon: "reco-juejin",
          },
          {
            text: "Github",
            link: "https://github.com/Pine-Nuts",
            icon: "reco-github",
          },
        ],
      },
    ],
    subSidebar: "auto", // 二级标题会在右侧生成导航栏
    sidebar: {
      // 多侧边栏
      "/blogs/CSS/": [
        { title: "介绍", path: "/blogs/CSS/" },
        { title: "CSS布局", path: "/blogs/CSS/CSS_layout" },
        { title: "Flex布局", path: "/blogs/CSS/Flex_layout" },
        { title: "CSS面试题", path: "/blogs/CSS/CSS_interview" },
        { title: "一些CSS", path: "/blogs/CSS/CSS_code" }
      ],
      "/blogs/JS/": [
        { title: "介绍", path: "/blogs/JS/" },
        { title: "JavaScript基础", path: "/blogs/JS/Base" },
      ],
      "/blogs/Vue/": [
        { title: "介绍", path: "/blogs/Vue/" },
        { title: "Vue面试题", path: "/blogs/Vue/Vue_interview" },
      ],
    },
    // sidebar: [ // 单侧边栏
    //   {
    //     title: "基础篇",
    //     // path: "/blogs/css/1",
    //     collapsable: false,
    //     children: [
    //       { title: "CSS", path: "/blogs/css/1"},
    //       { title: "JS", path: "/blogs/js/1" },
    //     ]
    //   }
    // ],
    // authorAvatar: '/avatar.png',
    // type: 'blog',
    // blogConfig: {
    //   category: {
    //     location: 2,
    //     text: '博客'
    //   },
    //   tag: {
    //     location: 3,
    //     text: '标签'
    //   }
    // }
  },
  plugins: [
    [
      "@vuepress/last-updated", // 更新时间格式化
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require("moment");
          moment.locale(lang);
          return moment(timestamp).fromNow();
        },
      },
    ],
    [
      '@vuepress/back-to-top' //返回顶部
    ],
    [
      "@vuepress-reco/vuepress-plugin-bgm-player", // 音乐播放器
      {
        audios: [
          // 本地文件示例
          {
            name: "Married Life",
            artist: "UP",
            url: "/blog/bgm/Married Life.mp3",
            cover: "/blog/bgm/UP.jpg",
          },
        ],
        // 是否默认缩小
        autoShrink: true,
        // 缩小时缩为哪种模式
        shrinkMode: "float",
        // 悬浮窗样式
        floatStyle: { bottom: "10px", "z-index": "999999" },
      },
    ],
    [
      "copyright", // 复制增加著作权信息
      {
        authorName: "乘以三", // 选中的文字将无法被复制
        minLength: 10, // 如果长度超过  10 个字符
      },
    ],
    [
      "vuepress-plugin-code-copy" // 代码复制
    ],
    [
      "vuepress-plugin-nprogress" // 切换页面加载滚动条
    ],
  ]
};
