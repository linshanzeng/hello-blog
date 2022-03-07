#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 指定config.js
cd docs/.vuepress

# 修改项目
sed -i -e '/#target01/c\
    base: "/life",
' config.js
# 修改首页
sed -i -e '/#target02/c\
                path: "/",
' config.js
# clientID
sed -i -e '/#target03 /c\
                    clientID: "336fa3e6ffb554c5a3b2",
' config.js
# 修改clientSecret
sed -i -e '/#target04 /c\
                    clientSecret: "5cf49959b1c8f68d445bd5df9f3699c975fe86fc",
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
git push -f git@github.com:linshanzeng/life.git main:main

# 回到docs
cd -

# 继续上传hello-blog
git add -A
git commit -m 'deploy'
git push -f git@github.com:linshanzeng/hello-blog.git main:main