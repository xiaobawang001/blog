# 个人 Markdown 笔记站（VitePress）

语雀风格个人知识库，基于 VitePress 构建。

- **GitHub Pages**（推荐）：https://xiaobawang001.github.io/blog/
- **GitCode**：见 [GITCODE_DEPLOY.md](GITCODE_DEPLOY.md)（Pages 需组织）

## 目录结构

```
blog/
├── vitepress/          # VitePress 站点（Markdown 在 docs/ 下）
├── scripts/            # 部署脚本
├── .gitlab-ci.yml      # GitCode CI 自动构建 Pages
├── GITCODE_DEPLOY.md   # 部署说明
└── README.md
```

## 本地预览

```bash
cd vitepress && npm install
npm run docs:dev
```

默认地址：http://localhost:5173/blog/

## 构建

```bash
cd vitepress && npm run docs:build
```

## 部署

### GitHub Pages（推荐，个人免费）

```bash
git push github master:main
```

在仓库 **Settings → Pages → Source** 选 **GitHub Actions**。详见 [GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)。

### GitCode

见 [GITCODE_DEPLOY.md](GITCODE_DEPLOY.md)。

## 写作

在 `vitepress/docs/` 下按文件夹组织 Markdown，写好 frontmatter 后侧栏自动生成：

```yaml
---
title: 文章标题
order: 1
---
```

完整说明见 `vitepress/docs/guide/publish.md`。

## 环境依赖

- Node.js 18+
- Git（部署用 SSH 推荐）
