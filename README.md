# 个人 Markdown 笔记站（VitePress）

语雀风格个人知识库，基于 VitePress 构建，部署到 GitHub Pages。

**在线地址**：https://xiaobawang001.github.io/

## 目录结构

```
blog/
├── docs/                   # Markdown 文章（VitePress 内容目录）
├── .github/workflows/      # GitHub Actions 自动部署
├── sidebar-tree.yaml       # 侧边栏层级配置
├── GITHUB_DEPLOY.md        # 部署说明
└── README.md
```

## 本地预览

```bash
npm install
npm run docs:dev
```

## 部署

推送 `master` 分支后 GitHub Actions 自动构建发布。详见 [GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)。

```bash
git push github master
```

## 写作

在 `docs/` 下按文件夹组织 Markdown，文件名即标题，编辑根目录 `sidebar-tree.yaml` 控制侧边栏排序。
