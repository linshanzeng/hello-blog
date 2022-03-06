module.exports = {
    title: '我的博客',
    description: '记录和回顾常用开发知识',
    base: '/',
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
}