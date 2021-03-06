# 我的博客

## 简介

一键上传部署单个或多个项目到Github

[导航](https://linshanzeng.github.io/blog/)

[生活](https://linshanzeng.github.io/life/)

[博客](https://linshanzeng.github.io/blog/)

## 运行帮助

```text
    npm install
    sh deploy.sh
```

## 1. 本地搭建

1. 使用包管理器初始化：

    ```text
    npm init
    ```

    查看npm源地址：

    ```text
    npm config get registry
    ```

    永久使用淘宝源：

    ```text
    npm config set registry https://registry.npmmirror.com
    ```

2. 将VuePress安装为本地依赖：

    ```text
    npm install -D vuepress
    ```

3. 创建文档根目录和第一篇文档（主页）：

    ```text
    mkdir docs && echo '# Hello VuePress' > docs/README.md
    ```

4. 在package.json中添加一些scripts：

    ```js
    {
        "scripts": {
            "dev": "vuepress dev docs",
            "build": "vuepress build docs"
        }
    }
    ```

5. 在本地启动服务器：

    ```text
    npm run dev
    ```

    > VuePress 会在 <http://localhost:8080> (opens new window) 启动一个热重载的开发服务器。

## 2. 基础配置

1. 在docs目录下创建.vuepress目录，新增config.js，配置网站标题和描述，方便SEO

    ```js
    module.exports = {
        title: 'linshanzeng的博客',
        description: '记录和回顾常用开发知识'
    }
    ```

## 3. 添加导航栏

1. 页面右上角添加导航栏，修改config.js

    ```js
    module.exports = {
        title: '...',
        description: '...',
        themeConfig: {
            nav: [
                { text: '首页', link: '/' },
                { 
                    text: 'linshanzeng的博客', 
                    items: [
                        { text: 'Github', link: 'https://github.com/linshanzeng/blog' }
                    ]
                }
            ]
        }
    }
    ```

## 4. 添加侧边栏

1. 在docs目录下创建daily目录，创建2022目录，页面左边添加侧边栏，修改config.js

    ```js
        module.exports = {
            themeConfig: {
                nav: [...],
                sidebar: [
                    {
                        title: 'README',
                        path: '/'
                    },
                    {
                    title: "日常",
                    path: '/daily',
                    collapsable: true, // 折叠
                    children: [
                        { title: "2022", path: "/daily/2022" }
                    ],
                    }
                ]
            }
        }
    ```

## 5. 更换主题

1. 安装vuepress-theme-reco：`npm install vuepress-theme-reco --save-dev`

2. 引用主题：

    ```js
    module.exports = {
        // ...
        theme: 'reco'
        // ...
    } 
    ```

## 6. 添加文章信息

1. 主题自动提取了第一个大标题作为本文的标题，可以在每篇文章的 md 文件中添加一些信息修改：

    ```text
    ---
    title: 搭建博客
    author: linshanzeng
    date: '2022-03-06'
    ---
    ```

## 7. 设置语言

1. 上图的文章时间，写入的格式为 2021-12-12 ，但是显示的是 12/12/2021，这是因为 VuePress 默认的 lang 为 en-US，修改一下 config.js：

    ```js
    module.exports = {
        // ...
        locales: {
            '/': {
                lang: 'zh-CN'
            }
        },
        // ...
    }  
    ```

## ~~8. 开启目录结构~~

1. 在原本的主题里，我们发现每篇文章的目录结构出现在左侧，而 vuepress-theme-reco 将原有的侧边栏的中的多级标题移出，生成子侧边栏，放在了页面的右侧，如果你要全局开启，可在页面 config.js 里设置开启

    ```js
    module.exports = {
    //...
    themeConfig: {
        subSidebar: 'auto'
    }
    //...
    }
    ```

## 9. 修改主题颜色

1. VuePress 基于 Vue，所以主题色用的是 Vue 的绿色，然而 TypeScript 的官方色则是蓝色，修改 VuePress 的主题色,可以新增一个 .vuepress/styles/palette.styl 文件：

    ```css
    $accentColor = #3178c6
    ```

## 10. 自定义修改样式

1. VuePress 提供了一种添加额外样式的简便方法。可以新增一个 .vuepress/styles/index.styl 文件。这是一个 Stylus 文件，但也可以使用正常的 CSS 语法：

    ```css
    // 通过检查，查看元素样式声明
    .dark .content__default code {
        background-color: rgba(58,58,92,0.7);
        color: #fff;
    }
    ```

2. ~~隐藏每篇文章的标题、作者、时间~~

    ```css
    .page .page-title {
        display: none;
    }
    ```

## 11. 部署

1. 在Github上新建一个仓库blog

2. 在 config.js 添加一个 base 路径配置：

    ```js
    module.exports = {
        base: '/blog',
        //...
    }
    ```

    完整config.js

    ```js

    ```

3. 在blog目录下新增deploy.sh

    ```sh
    #!/usr/bin/env sh

    # 确保脚本抛出遇到的错误
    set -e

    # 生成静态文件
    npm run build

    # 进入生成的文件夹
    cd docs/.vuepress/dist

    git init
    git add -A
    git commit -m 'deploy'

    # 如果发布到 https://<USERNAME>.github.io/<REPO>
    git push -f git@github.com:linshanzeng/blog.git main:main

    # 回到docs
    cd -

    # 继续上传hello-blog
    git add -A
    git commit -m 'deploy'
    git push -f git@github.com:linshanzeng/hello-blog.git main:main
    ```

4. 执行deploy.sh：

    ```text
    sh deploy.sh
    ```

## 关联链接

[linshanzeng的导航](https://linshanzeng.github.io/)
[linshanzeng的博客](https://linshanzeng.github.io/blog)
[linshanzeng的生活](https://linshanzeng.github.io/life)

## 参考链接

[用 VuePress + Github Pages 搭建博客](https://github.com/mqyqingfeng/Blog/issues/235)

[蝉时雨の笔记](https://chanshiyu.gitbook.io/blog/shi-yu/2019/15-no)

[如何正确使用淘宝npm镜像](https://segmentfault.com/a/1190000027083723)

[git 放弃修改，放弃增加文件操作](https://blog.csdn.net/ustccw/article/details/79068547)

[Markdown错误](https://zhuanlan.zhihu.com/p/68015264)

[VuePress集成Gitalk](https://github.com/JoeyBling/vuepress-plugin-mygitalk)

[Gitalk配置使用教程](https://iochen.com/post/use-gitalk-in-hexo/)
