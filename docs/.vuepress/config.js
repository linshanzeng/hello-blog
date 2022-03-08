module.exports = {
    title: "个人收藏夹", // #target05
    description: '记录和回顾常用开发知识',
    base: "/", // #target01
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
            { text: 'GitHub', link: 'https://github.com/linshanzeng/hello-blog' },
        ],
        sidebar: [
            {
                title: "看点好玩的",  // #target07
                path: "/first", // #target02
                collapsable: false, // 折叠
            },
            {
                title: '前端',
                path: "/blog/前端/Git学习笔记",
                collapsable: false, // 折叠
                children: [
                    { title: 'Git学习笔记', path: '/blog/前端/Git学习笔记' }, 
                    { title: '博客搭建', path: '/blog/前端/博客搭建' }, 
                ],
            }
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
                    clientID: "7d320e2625be17b796f6", // #target03
                    // GitHub Application Client Secret.
                    clientSecret: "f95bc1c1c0e2b09aa590ed3e361a10c0bfc044f6", // #target04
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