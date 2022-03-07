#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 指定config.js
cd docs/.vuepress

# 修改项目
sed -i -e '/#target01/c\
    base: "/blog", // #target01
' config.js
# 修改首页
sed -i -e '/#target02/c\
                path: "/blog", // #target02
' config.js
# clientID
sed -i -e '/#target03/c\
                    clientID: "020331372202cd5df3a9", // #target03
' config.js
# 修改clientSecret
sed -i -e '/target04/c\
                    clientSecret: "9cc0245b024b4f67740ebe5293bc6141ef2368d5", // #target04
' config.js
# 标题
sed -i -e '/#target05/c\
    title: "博客", // #target05
' config.js
cd -

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