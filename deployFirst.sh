#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 指定config.js
cd docs/.vuepress

# 修改目标网站
#sed -i '' '4c\
#    base: "/",
#' config.js
sed -i -e '/#target01/c\
    base: "/", // #target01
' config.js
# 修改首页
sed -i -e '/#target02/c\
                path: "/first/", // #target02
' config.js
# clientID
sed -i -e '/#target03/c\
                    clientID: "7d320e2625be17b796f6", // #target03
' config.js
# 修改clientSecret
sed -i -e '/#target04/c\
                    clientSecret: "f95bc1c1c0e2b09aa590ed3e361a10c0bfc044f6", // #target04
' config.js
# 修改标题
sed -i -e '/#target05/c\
    title: "个人收藏夹", // #target05
' config.js
# 修改首页标题
sed -i -e '/#target07/c\
                title: "看点好玩的",  // #target07
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
git push -f git@github.com:linshanzeng/linshanzeng.github.io.git main:main

# 回到docs
cd -

# 继续上传hello-blog
git add -A
git commit -m 'deploy'
git push -f git@github.com:linshanzeng/hello-blog.git main:main