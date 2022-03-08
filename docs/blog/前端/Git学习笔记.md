---
title: Git学习笔记
date: 2022-03-08
---

## 1. Git简介

### 1.1 安装Git

1. 查看系统有没有安装Git：

    ```sh
    git
    ```

2. 指定用户名和邮箱：

    ```sh
    git config --global user.name "chiyisan"
    git config --global user.email "chiyisan@gmail.com"
    ```

### 1.2 创建版本库

1. 初始化一个Git仓库：

    ```sh
    git init
    ```

2. 把文件添加到仓库：

    ```sh
    git add readme.txt
    git commit -m “wrote a readme file”
    ```

3. 一次提交多个文件：

    ```sh
    touch file1.txt file2.txt file3.txt
    git add file1.txt
    git add file2.txt file3.txt
    git commit -m "add 3 files."
    ```

## 2 时光机穿梭

1. 查看工作区状态：

    ```sh
    git status
    ```

2. 查看修改内容：

    ```sh
    git diff readme.txt
    ```

### 2.1 版本回退

1. 查看提交历史：

    ```sh
    git log
    ```

2. 查看简化提交历史：

    ```sh
    git log --pretty=oneline
    ```

3. 回退到上一个版本：

    ```sh
    git reset --hard HEAD^
    ```

4. 回退到指定版本：

    ```sh
    git reset --hard 52b34
    ```

5. 查看命令历史：

    ```sh
    git reflog
    ```

### 2.2 管理修改

1. 查看工作区和版本库里面最新版本的区别：

    ```sh
    git diff HEAD -- readme.txt
    ```

### 2.3 撤销修改

1. 丢弃工作区的修改：

    ```sh
    方法一：
    git restore readme.txt
    方法二：
    git checkout -- readme.txt
    ```

2. 丢弃暂存区的修改：

    ```sh
    git add readme.txt

    方法一：
    git restore --staged readme.txt
    方法二：
    git reset HEAD readme.txt
    ```

### 2.4 删除文件

1. 删除文件

    ```sh
    git commit -m "add test.txt"
    rm test.txt

    删除文件：
    git rm test.txt
    git commit -m "remove test.txt"
    还原删除文件方法一：
    git restore test.txt
    还原删除文件方法三：
    git checkout -- test.txt
    ```

## 3. 远程仓库

1. 创建SSH Key：

    ```sh
    ssh-keygen -t rsa -C "chiyisan@gmail.com"
    cat ~/.ssh/id_rsa.pub
    ```

### 3.1 添加远程仓库

1. 关联一个远程库：

    ```sh
    git remote add origin git@github.com:linshanzeng/hello-git.git
    ```

2. 首次推送到远程库：

    ```sh
    git push -u origin master
    ```

3. 非首次推送到远程库：

    ```sh
    git push origin master
    ```

4. 删除远程库：

    ```sh
    查看远程库信息：git remote -v
    删除本地和远程的绑定管理：git remote rm origin
    ```

### 3.2 从远程仓库克隆

1. 克隆一个本地库：

    ```sh
    git clone git@github.com:linshanzeng/hello-git2.git
    ```

## 4. 分支管理

1. 创建dev分支：

    ```sh
    方法一：
    创建dev分支，并切换到dev分支：git checkout -b dev
    方法二：
    创建dev分支：git branch dev
    切换到dev分支：git checkout dev
    方法三：
    git switch -c dev
    方法四：
    git branch dev
    git switch dev
    ```

2. 查看分支：

    ```sh
    git branch
    ```

3. dev分支合并到main分支上：

    ```sh
    git add readme.txt
    git commit -m "branch test"
    git switch main
    dev分支合并到main分支上：git merge dev
    删除dev分支：git branch -d dev
    git branch
    ```

### 4.1 *解决冲突*

1. 查看提交历史以图形：

    ```sh
    git log --graph --pretty=oneline --abbrev-commit
    ```

### 4.2 *分支管理策略*

1. 分支管理策略

    ```sh
    git switch -c dev
    git add readme.txt
    git commit -m "add merge"
    git swich master 
    强制禁用Fast forward，dev分支合并到main分支上：git merge --no-ff -m "merge with no-ff" dev
    ```

### 4.3 *Bug分支*

1. Bug分支

    ```sh
    touch hello.py
    git add hello.py
    储藏现场：git stash
    git switch main
    git switch -c issue-101
    git add readme.txt
    git commit -m "fix bug 101"
    git switch main
    git merge --no-ff -m "merged fix bug 101" issue-101
    git branch -d issue-101
    git switch dev
    同步修复bug（fix bug 101）：git cherry-pick 2113a85
    查看所有现场：git stash list

    第一种：
    恢复并删除现场：git stash pop
    第二种：
    恢复现场：git stash apply
    删除现场：git stash drop
    ```

### 4.4 Feature分支

1. 强制删除：

    ```sh
    git branch -D feature-vulcan
    ```

### 4.5 *多人协作*

1. 多人协作

    ```sh
    查看远程库：git remote
    查看远程库详细信息：git remote -v
    推送分支：
    git push origin main
    推送dev分支：git push origin dev
    master分支是主分支，推送
    dev分支是开发分支，推送
    bug分支，可选
    feature分支，可选
    ```

2. 抓取分支

    ```sh
    git clone git@github.com:linshanzeng/hello-git2.git
    clone后默认只有main分支：git branch
    git switch -c dev origin/dev
    抓取分支：git pull
    指定本地dev分支和远程dev分支链接：git branch --set-upstream-to=origin/dev dev
    ```

3. 多人协作的工作模式：

    ```text
    1.首先，可以试图用git push origin dev推送自己的修改；
    2.如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
    3.如果合并有冲突，则解决冲突，并在本地提交；
    4.没有冲突或者解决掉冲突后，再用git push origin dev推送就能成功！
    如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to=origin/dev dev。
    ```

4. Rebase

    ```sh
    git push origin main
    别人先提交，出现问题：git pull
    变基：git rebase
    git push origin main

    rebase操作可以把本地未push的分叉提交历史整理成直线
    ```

## 5. 标签管理

### 5.1 创建标签

1. 打一个先新标签：

    ```sh
    git tag v1.0
    ```

2. 查看所有标签：

    ```sh
    git tag
    ```

3. 给某次提交打标签：

    ```sh
    git tag v0.9 f52c633
    ```

4. 打一个带说明的标签：

    ```sh
    git tag -a v0.1 -m "version 0.1 released" 1094adb
    ```

5. 查看标签信息：

    ```sh
    git show v0.9
    ```

### 5.2 操作标签

1. 删除一个标签：

    ```sh
    git tag -d v0.1
    ```

2. 推送一个标签：

    ```sh
    git push origin v1.0
    ```

3. 推送所有未推送的标签：

    ```sh
    git push origin --tags
    ```

4. 删除一个远程标签：

    ```sh
    git tag -d v0.9
    git push origin :refs/tags/v0.9
    ```

## 6. 使用Gitee

1. 删除已有的GitHub远程库：

    ```sh
    git remote rm origin
    ```

2. 关联GitHub远程库：

    ```sh
    git remote add github git@github.com:linshanzeng/hello-git2.git
    ```

3. 关联Gitee远程库：

    ```sh
    git remote add gitee git@gitee.com:chiyisan/hello-git2.git
    ```

4. 推送到GitHub：

    ```sh
    git push github main
    ```

5. 推送到Gitee：

    ```sh
    git push gitee master
    ```

## 7. 自定义Git

1. 显示颜色：

    ```sh
    git config --global color.ui true
    ```

### 7.1 忽略特殊文字

1. 强制添加文件到Git：

    ```sh
    方法一：
    强制添加：git add -f App.class
    方法二：
    查看出错规则：git check-ignore -v App.class
    修改.gitignore文件
    ```

### 7.2 配置别名

1. 配置别名

    ```sh
    status别名：git config --global alias.st status
    checkout别名：git config --global alias.ck checkout
    commit别名：git config --global alias.cm commit
    branch别名：git config --global alias.br branch
    reset HEAD别名：git config --global alias.rs 'reset HEAD'
    log -1别名：git config --global alias.last 'log -1'
    git log别名：git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
    当前仓库配置文件：cat .git/config
    当前用户配置文件：cat ~/.gitconfig
    ```

## 8. 关联链接

[hello-git](https://github.com/linshanzeng/hello-git)

## 9. 参考链接

[Git教程](https://www.liaoxuefeng.com/wiki/896043488029600/896067074338496)

[忽略特殊文件配置文件](https://github.com/github/gitignore)

[Git Cheat Sheet](https://liaoxuefeng.gitee.io/resource.liaoxuefeng.com/git/git-cheat-sheet.pdf)

[Git的官方网站](https://git-scm.com/)
