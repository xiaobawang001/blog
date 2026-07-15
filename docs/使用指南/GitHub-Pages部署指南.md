# GitHub Pages 部署指南

## 访问地址（启用后）

https://xiaobawang001.github.io/

---

## 前置条件：仓库命名

仓库名必须为 `xiaobawang001.github.io`，GitHub Pages 才会在根路径提供服务。如果仓库还叫 `blog`，先去 GitHub 重命名。

## 首次启用（必做，只需一次）

### 第 1 步：把 Source 设为 GitHub Actions

1. 打开 https://github.com/xiaobawang001/xiaobawang001.github.io/settings/pages
2. 在 **Build and deployment** 区域找到 **Source** 下拉框
3. 选择 **GitHub Actions**（不要选 Deploy from a branch）

### 第 2 步：允许 `master` 分支部署

首次从 `main` 切到 `master` 时，deploy 可能报错：

```text
Branch "master" is not allowed to deploy to github-pages due to environment protection rules.
```

按下面改一次即可：

1. 打开对应仓库的 Settings → Environments
2. 点击 **github-pages**
3. 找到 **Deployment branches**（部署分支）
4. 选 **All branches**，或在 **Selected branches** 里添加 **master**
5. 保存

### 第 3 步：重新运行部署

1. 打开仓库 Actions 页面
2. 点击 **Run workflow** → 选 `master` → **Run workflow**
3. 等约 1～2 分钟，**build** 和 **deploy** 都变绿 ✓

### 第 4 步：确认站点

回到 **Settings → Pages**，顶部应出现：

```text
Your site is live at https://xiaobawang001.github.io/
```

---

## 若 deploy 仍失败

| 错误信息 | 处理 |
|----------|------|
| `Branch "master" is not allowed to deploy...` | 见上文第 2 步，放行 `master` |
| `Ensure GitHub Pages has been enabled` | 第 1 步 Source 还没改成 **GitHub Actions** |

---

## 日常更新

```bash
git add .
git commit -m "docs: 更新笔记"
git push origin master
```

推送后 Actions 会自动重新部署。

## 本地预览

```bash
npm run docs:dev
# http://localhost:5173/
```

## SSH

```bash
ssh -T git@github.com
```
