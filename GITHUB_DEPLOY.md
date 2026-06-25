# GitHub Pages 部署指南

## 访问地址

https://xiaobawang001.github.io/blog/

## 自动部署

推送后，`.github/workflows/deploy.yml` 会自动构建并发布。

**首次需在 GitHub 开启 Pages：**

1. 打开 https://github.com/xiaobawang001/blog/settings/pages
2. **Source** 选择 **GitHub Actions**
3. 保存后到 **Actions** 查看部署进度

## 推送代码

```bash
git push github master:main
```

## 本地预览

```bash
cd vitepress && npm run docs:dev
```

## 新建文章

在 `vitepress/docs/` 下新建 `.md`，写好 `title` 和 `order` 后推送即可。
