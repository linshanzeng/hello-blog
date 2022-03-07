#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 指定config.js
cd docs/.vuepress
sed -i '' '4c\
    base: "/life",
' config.js
sed -i '' '51c\
                    clientID: "336fa3e6ffb554c5a3b2",
' config.js
sed -i '' '53c\
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