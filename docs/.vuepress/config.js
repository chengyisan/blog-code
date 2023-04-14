/*
 * @Author: srcheng 17755456856@163.com
 * @Date: 2023-04-12 17:13:43
 * @LastEditors: srcheng 17755456856@163.com
 * @LastEditTime: 2023-04-14 13:48:57
 * @FilePath: \blog\docs\.vuepress\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    type: 'blog',
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
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ]
  ]
}