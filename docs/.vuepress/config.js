const moment = require('moment');

module.exports = {
  title: '乘以三的博客',
  description: '菜鸟的尝试',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/blog/',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    author: 'chengyisan',
    logo: '/logo.png',
    authorAvatar: '/avatar.png',
    // type: 'blog',
    type: 'BlogHome',
    lastUpdated: '上次更新',
    nav: [
      {text: '首页', link: '/'},
      {text: '文档', link: '/blogs/'},
      {
        text: '关于我',
        // 这里是下拉列表展现形式
        items: [
          {text: '掘金', link: 'https://juejin.cn/user/1121946905352599', icon: 'reco-juejin'},
          {text: 'Github', link: 'https://github.com/Pine-Nuts', icon: 'reco-github'},
        ]
      },
    ],
    subSidebar: 'auto', // 二级标题会在右侧生成导航栏
    sidebar: { // 多侧边栏
      '/blogs/': [
        {
          title: "基础",
          collapsable: false,
          children: [
            { title: "介绍", path: "/blogs/"},
            { title: "CSS", path: "/blogs/css/1"},
            { title: "JavaScript", path: "/blogs/js/1" },
            { title: "Vue", path: "/blogs/vue/1" },
          ]
        }
      ]
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
      '@vuepress/last-updated', // 最新更新时间格式化
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ],
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',
      {
        theme: ['blackCat'],
        messages: {
          home: 'Carl&Ellie',
          close: '返回喵星'
        }
      }
    ],
    [
      'copyright',  // 复制增加著作权信息
      {
        authorName: '乘以三', // 选中的文字将无法被复制
        minLength: 10, // 如果长度超过  10 个字符
      },
    ],
    ['vuepress-plugin-nprogress'] // 切换页面加载滚动条
    ['@vuepress-reco/vuepress-plugin-bgm-player',
      {
        audios: [
          // 本地文件示例
          {
            name: 'Married Life',
            artist: 'UP',
            url: '/bgm/Married Life.mp3',
            cover: '/bgm/UP.jpg'
          }
        ],
        // 是否默认缩小
        autoShrink: true ,
        // 缩小时缩为哪种模式
        shrinkMode: 'float',
        // 悬浮窗样式
        floatStyle:{ bottom: '10px', 'z-index': '999999' }
      }
    ]
  ]
}