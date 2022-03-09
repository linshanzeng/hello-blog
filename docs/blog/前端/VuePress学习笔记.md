---
title: VuePress学习笔记
date: 2022-03-09
---

[[toc]]

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

## 3. 目录结构

1. `docs`作为`targetDir`，文件的相对路径都是相对于`docs`目录的，默认页面路由地址如下：

|文件的相对路径|页面路由地址|
|-|-|
|/README.md|/|
|/guide/README.md|/guide/|
|/config.md|/config.html|

## 4. 基本配置

1. 一个 VuePress 网站必要的配置文件是`.vuepress/config.js`，它应该导出一个 JavaScript 对象：

    ```js
    module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around'
    }
    ```

> 对于上述的配置，如果你运行起 dev server，你应该能看到一个页面，它包含一个页头，里面包含一个标题和一个搜索框。VuePress 内置了基于 headers 的搜索 —— 它会自动为所有页面的标题、h2 和 h3 构建起一个简单的搜索索引。

::: tip
**其他配置格式**

你也可以使用 YAML (.vuepress/config.yml) 或是 TOML (.vuepress/config.toml) 格式的配置文件。
:::

2.主题配置

一个 VuePress 主题应该负责整个网站的布局和交互细节。

3.应用级别的配置

由于 VuePress 是一个标准的 Vue 应用，你可以通过创建一个 .`vuepress/enhanceApp.js` 文件来做一些应用级别的配置，当该文件存在的时候，会被导入到应用内部。`enhanceApp.js` 应该 `export default` 一个钩子函数，并接受一个包含了一些应用级别属性的对象作为参数。你可以使用这个钩子来安装一些附加的 Vue 插件、注册全局组件，或者增加额外的路由钩子等：

```js
// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
}
```

## 5. 静态资源

如果你的网站会被部署到一个非根路径，你将需要在 `.vuepress/config.js` 中设置 `base`，举例来说，如果你打算将你的网站部署到 <https://foo.github.io/bar/>，那么 base 的值就应该被设置为 `"/bar/"` (应当总是以斜杠开始，并以斜杠结束)。
有了基础路径（Base URL），如果你希望引用一张放在 `.vuepress/public` 中的图片，VuePress 提供了内置的一个 helper $withBase（它被注入到了 Vue 的原型上），可以帮助你生成正确的路径：

```vue
<img :src="$withBase('/foo.png')" alt="foo">
```

最后补充一句，一个 base 路径一旦被设置，它将会自动地作为前缀插入到 `.vuepress/config.js` 中所有以 `/` 开始的资源路径中。

## 6. Markdown扩展

1. 内部链接

网站内部的链接，将会被转换成 `<router-link>` 用于 SPA 导航。同时，站内的每一个文件夹下的 README.md 或者 index.md 文件都会被自动编译为 index.html，对应的链接将被视为 /。

```text
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

假设你现在在 foo/one.md 中：:100:

```md
[Home](/) <!-- 跳转到根部的 README.md -->
[foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html -->
[foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->
[bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾（推荐） -->
[bar - four](../bar/four.html) <!-- 也可以用 .html -->
```

2.Emoji

```text
:tada: :100:
```

3.目录

```text
[[toc]]
```

4.自定义容器（默认主题）

```md
::: tip
提示
:::

::: warning
警告
:::

::: danger
危险
:::

::: details
详情，在IE/Edge不生效
:::

自定义块中标题
::: danger STOP
危险区域，禁止通信
:::

::: details 点击查看代码
#```js
console.log('你好，VuePress！')
#```
:::
```

5.代码中行高亮

``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

除了单行以外，你也可指定多行，行数区间，或是两者都指定。

- 行数区间: 例如 {5-8}, {3-10}, {10-17}
- 多个单行: 例如 {4,7,9}
- 行数区间与多个单行: 例如 {4,7-13,16,23-27,40}

6.行号

```js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}
```

## 7. 在Markdown中使用Vue

1. 模版语法

    ```md
    {{ 1 + 1}}
    ```

2. 指令

    ```md
    <span v-for="i in 3">{{ i }} </span>
    ```

3. 访问网站以及页面的数据

    编译后的组件没有私有数据，但可以访问 网站的元数据，举例来说：

    ```md
    {{ $page }}
    ```

4. Escaping

    默认情况下，块级 (block) 的代码块将会被自动包裹在 v-pre 中。如果你想要在内联 (inline) 的代码块或者普通文本中显示原始的大括号，或者一些 Vue 特定的语法，你需要使用自定义容器 v-pre 来包裹：

    ```md
    ::: v-pre
    `{{ This will be displayed as-is }}`
    :::
    ```

5. 使用组件

所有在 .vuepress/components 中找到的 *.vue 文件将会自动地被注册为全局的异步组件

```md
<demo-1/>
<OtherComponent/>
<Foo-Bar/>
```

::: warning 重要！
请确保一个自定义组件的名字包含连接符或者是 PascalCase，否则，它将会被视为一个内联元素，并被包裹在一个`<p>` 标签中，这将会导致 HTML 渲染紊乱，因为 HTML 标准规定，`<p>` 标签中不允许放置任何块级元素。
:::

## 8. 多语言支持

```js
module.exports = {
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  }
}
```

## 9. 配置永久链接

1. 可以使用全局配置来向所有页面应用永久链接：

    ```js
    // .vuepress/config.js
    module.exports = {
    permalink: "/:year/:month/:day/:slug"
    };
    ```

2. 可以只为单独一个页面去设置永久链接。这种方式比全局配置拥有更高的优先级。

```md
---
title: Hello World
permalink: /hello-world
---

Hello!
```

|变量|介绍|
|-|-|
|:year|文章发布的年份 (4数字)|
|:month|文章发布的月份 (2数字)|
|:i_month|文章发布的月份 (前面不带0)|
|:day|文章发布的日份 (2数字)|
|:i_day|文章发布的日份 (前面不带0)|
|:slug|蛞蝓化文件路径 (不带扩展名)|
|:regular|VuePress默认的生成永久链接的方式，具体实现看[这里](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/shared-utils/src/fileToPath.ts)|

## 参考链接

- [**VuePress官方中文指南**](https://vuepress.vuejs.org/zh/guide/)
- [**Markdown 语法速查表**](https://www.markdown.xyz/cheat-sheet/)
- [**markdownlint**](https://github.com/DavidAnson/markdownlint/blob/v0.25.1/doc/Rules.md)
- [**markdownEmoji**](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)
