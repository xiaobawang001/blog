# GitCode 部署指南

## 重要：Pages 仅组织可用

GitCode 当前 **个人账号无法部署 Pages**，只有 **组织（Organization）** 下的项目才能开启 Pages。

你有两条路：

| 方案 | 说明 | 推荐 |
|------|------|------|
| **A. 创建组织** | 免费，代码仍放 GitCode，Pages 正常用 | ✅ 首选 |
| **B. 换托管平台** | 代码放 GitCode，静态站部署到 Cloudflare Pages 等 | 备选 |

---

## 方案 A：创建组织并启用 Pages（推荐）

### 1. 新建组织

1. 登录 [GitCode](https://gitcode.com)
2. 点击顶部 **「+」→ 新建组织**
3. 填写组织名称，例如：`xiaobawang` 或 `bobo-notes`（英文、短一些更好）
4. 完成创建

文档：https://docs.gitcode.com/docs/orgs/new-org

### 2. 把仓库迁到组织下

任选一种方式：

**方式一：转移现有项目（推荐）**

1. 打开个人仓库 https://gitcode.com/xiaobawang001/blog
2. **项目设置 → 高级 → 转移项目**
3. 目标选择刚创建的组织
4. 确认转移

**方式二：在组织下新建仓库再推送**

```bash
# 组织名假设为 bobo-notes
git remote set-url gitcode git@gitcode.com:bobo-notes/blog.git
git push -u gitcode master
```

### 3. 在组织项目里开启 Pages

1. 进入组织下的 `blog` 项目
2. **部署 → Pages**（或 Pages App）
3. 按提示启用；CI 流水线 `.gitlab-ci.yml` 会在推送 `master` 时自动构建

### 4. 更新本地 remote（若转移了项目）

```bash
git remote set-url gitcode git@gitcode.com:组织名/blog.git
```

### 5. 访问地址

一般为：

```
https://<组织名>.gitcode.io/blog/
```

`config.ts` 里 `base: '/blog/'` 与仓库名一致即可，**不必改 base**（除非仓库改名）。

---

## 方案 B：GitCode 存代码 + Cloudflare Pages 托管

若不想建组织，可继续用 GitCode 存 Markdown 源码，把构建产物部署到 [Cloudflare Pages](https://pages.cloudflare.com/)（个人免费）。

1. 注册 Cloudflare，创建 Pages 项目
2. 本地构建并上传：

```bash
cd vitepress && npm run docs:build
npx wrangler pages deploy docs/.vitepress/dist --project-name=blog
```

3. 在 Cloudflare 项目设置里把 **Custom domain** 或默认 `*.pages.dev` 用作访问地址
4. 此时 `config.ts` 的 `base` 需改为 Cloudflare 给出的路径（根域名用 `base: '/'`）

后续可在 `.gitlab-ci.yml` 里加 wrangler 自动部署（需在 GitCode CI 变量里配置 `CLOUDFLARE_API_TOKEN`）。

---

## 日常流程（组织 Pages 方案）

| 步骤 | 操作 |
|------|------|
| 写笔记 | 编辑 `vitepress/docs/` 下 `.md` |
| 推送 | `git push gitcode master` |
| 自动构建 | `.gitlab-ci.yml` → `pages` 任务 |
| 访问 | 组织 Pages 地址 |

## SSH（已配置可跳过）

```bash
ssh -T git@gitcode.com
# 应看到：Welcome to GitCode, xiaobawang001
```

## 本地预览 / 构建

```bash
cd vitepress && npm run docs:dev
cd vitepress && npm run docs:build
```

## 手动推送静态文件（组织 Pages 仓库）

```bash
export GITCODE_ORG=你的组织名   # 有组织时必填
export GITCODE_USER=xiaobawang001
./scripts/deploy-gitcode.sh --push
```

## 在 GitCode 新建文章

1. 在 `vitepress/docs/` 新建或编辑 `.md`
2. frontmatter 写 `title`、`order`
3. `git push`
4. 等流水线完成后刷新 Pages

详细约定见 `vitepress/docs/guide/publish.md`。

## 常见问题

**个人账号看不到 Pages？**  
正常，请用 **方案 A 创建组织** 或 **方案 B 换 Cloudflare**。

**流水线成功但 Pages 空白？**  
检查 `config.ts` 的 `base` 是否为 `/blog/`（与仓库名一致）。

**转移项目后 push 失败？**  
更新 remote：`git remote set-url gitcode git@gitcode.com:组织名/blog.git`
