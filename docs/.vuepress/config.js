module.exports = {
    title: '我的博客',
    description: '记录和回顾常用开发知识',
    base: '/blog',
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
            { text: '首页', link: '/' },
            { 
                text: '链接', 
                items: [
                    { text: '导航', link: 'https://linshanzeng.github.io/' },
                    { text: '生活', link: 'https://linshanzeng.github.io/life' },
                    { text: '博客', link: 'https://linshanzeng.github.io/life' },
                ]
            }
        ],
        sidebar: [
            {
                title: 'README',
                path: '/'
            },
            {
                title: "前端",
                path: '/daily',
                collapsable: false, // 折叠
                children: [
                    { title: "HTML", path: "/daily/HTML" }
                ],
            }
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
                    clientID: '',
                    // GitHub Application Client Secret.
                    clientSecret: '',
                    // GitHub repository. 存储评论的 repo
                    repo: '',
                    // GitHub repository 所有者，可以是个人或者组织。
                    owner: '',
                    // GitHub repository 的所有者和合作者 (对这个 repository 有写权限的用户)。(不配置默认是owner配置)
                    admin: [''],
                    // 设置语言(default: zh-CN)
                    language: 'zh-CN',
                }
            }
        ],
    ],
}