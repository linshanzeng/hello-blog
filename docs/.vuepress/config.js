module.exports = {
    title: "生活", // #target05
    description: '记录和回顾常用开发知识',
    base: "/life/", // #target01
    theme: 'reco',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        subSidebar: 'auto',
        lastUpdated: '上次更新', // string | boolean
        author: 'linshanzeng',
        nav: [
            { text: "", link: "/life" }, // #target06
            { text: 'GitHub', link: 'https://github.com/linshanzeng/hello-blog' },
        ],
        sidebar: [
            {
                title: 'README',
                path: "/life", // #target02
                collapsable: false, // 折叠
            },
            {
                title: '前端',
                path: "/blog/前端/Git学习笔记",
                collapsable: false, // 折叠
                children: [
                    { title: 'Git学习笔记', path: '/blog/前端/Git学习笔记' }, 
                ],
            }
            // #target07
        ],
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
                    clientID: "336fa3e6ffb554c5a3b2", // #target03
                    // GitHub Application Client Secret.
                    clientSecret: "5cf49959b1c8f68d445bd5df9f3699c975fe86fc", // #target04
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