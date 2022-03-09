module.exports = {
    title: "博客", // #target05
    description: '记录和回顾常用开发知识',
    base: "/blog/", // #target01
    theme: 'reco',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    markdown: {
        lineNumbers: true,
    },
    permalink: "/:year/:month/:day/:slug", //配置永久链接
    themeConfig: {
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'linshanzeng/hello-blog',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: '查看源码',
        // 以下为可选的编辑链接选项
        // 假如你的文档仓库和项目本身不在一个仓库：
        docsRepo: 'linshanzeng/hello-blog',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'main',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '帮助我改善此页面！',

        subSidebar: 'auto',
        lastUpdated: '上次更新', // string | boolean
        author: 'linshanzeng',
        nav: [
            // { text: 'GitHub', link: 'https://github.com/linshanzeng/hello-blog' },
        ],
        sidebar: [
            {
                title: "今日事，今日必",  // #target07
                path: "/blog/", // #target02
                collapsable: false, // 折叠
            },
            {
                title: '前端',
                path: "/blog/前端/Git学习笔记",
                collapsable: false, // 折叠
                children: [
                    { title: 'Git学习笔记', path: '/blog/前端/Git学习笔记' }, 
                    { title: '博客搭建', path: '/blog/前端/博客搭建' }, 
                    { title: 'VuePress学习笔记', path: '/blog/前端/VuePress学习笔记' }, 
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