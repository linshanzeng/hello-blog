module.exports = {
    title: "博客", // #target05
    description: '记录和回顾常用开发知识',
    base: "/blog", // #target01
    theme: 'reco',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        subSidebar: 'auto',
        lastUpdated: '上次更新', // string | boolean
        nav: [
            { text: "首页", link: "/blog" }, // #target06
            { 
                text: '链接', 
                items: [
                    { text: 'GitHub', link: 'https://github.com/linshanzeng/hello-blog' },
                    { text: '导航', link: 'https://linshanzeng.github.io/' },
                    { text: '生活', link: 'https://linshanzeng.github.io/life' },
                    { text: '博客', link: 'https://linshanzeng.github.io/blog' },
                ]
            }
        ],
        sidebar: [
            {
                title: 'README',
                path: "/blog", // #target02
                collapsable: false, // 折叠
                // children: [
                //     { title: 'HTML', path: '/daily/HTML' }
                // ],
            },
            // {
            //     title: '前端',
            //     path: '/daily',
            //     collapsable: false, // 折叠
            //     children: [
            //         { title: 'HTML', path: '/daily/HTML' }
            //     ],
            // }
        ]
    },
    plugins: [
        [
            'vuepress-plugin-mygitalk', {
                // 是否启用(关闭请设置为false)(default: true)
                enable: true,
                // 是否开启首页评论(default: true)
                home: true,
                // Gitalk配置
                gitalk: {
                    // GitHub Application Client ID.
                    clientID: "020331372202cd5df3a9", // #target03
                    // GitHub Application Client Secret.
                    clientSecret: "9cc0245b024b4f67740ebe5293bc6141ef2368d5", // #target04
                    // GitHub repository. 存储评论的 repo
                    repo: 'gitalk',
                    // GitHub repository 所有者，可以是个人或者组织。
                    owner: 'linshanzeng',
                    // GitHub repository 的所有者和合作者 (对这个 repository 有写权限的用户)。(不配置默认是owner配置)
                    admin: ['linshanzeng'],
                    // 设置语言(default: zh-CN)
                    language: 'zh-CN',
                }
            }
        ],
    ],
}