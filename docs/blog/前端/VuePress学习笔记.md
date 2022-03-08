---
title: VuePress学习笔记
date: 2022-03-09
---

## 1. 介绍

1. VuePress 由两部分组成：第一部分是一个极简静态网站生成器 ，它包含由 Vue 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

2. 每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

3. 工作原理：一个 VuePress 网站是一个由 Vue、Vue Router 和 webpack驱动的单页应用。

## 2. 快速上手

```sh
# 1. 创建并进入一个新目录
mkdir vuepress-starter && vuepress-starter
# 2. 使用你喜欢的包管理器进行初始化
npm init
# 3. 将 VuePress 安装为本地依赖
npm install -D vuepress
# 4. 创建你的第一篇文档
mkdir docs && echo '# Hello VuePress' > docs/README.md
# 5. 在 package.json 中添加一些 scripts
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
# 6. 在本地启动服务器
npm run docs:dev
```

> VuePress 会在 <http://localhost:8080>启动一个热重载的开发服务器。

## 目录结构

1. 默认页面路由地址如下：

|文件的相对路径|页面路由地址|
|-|-|
|/README.md|/|
|/guide/README.md|/guide/|
|/config.md|/config.html|

## 参考链接

- [**VuePress官方中文指南**](https://vuepress.vuejs.org/zh/guide/)
- [**Markdown 语法速查表**](https://www.markdown.xyz/cheat-sheet/)
- [**markdownlint**](https://github.com/DavidAnson/markdownlint/blob/v0.25.1/doc/Rules.md)
