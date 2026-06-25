#!/usr/bin/env bash
# 本地构建 VitePress，可选推送到 GitCode Pages 仓库
set -euo pipefail

GITCODE_HOST="${GITCODE_HOST:-gitcode.com}"
GITCODE_USER="${GITCODE_USER:-xiaobawang001}"
GITCODE_ORG="${GITCODE_ORG:-}"   # Pages 仅组织可用时填组织名
GITCODE_BRANCH="${GITCODE_BRANCH:-master}"
# Pages 仓库名，需与 config.ts 中 base 路径一致（默认 /blog/）
PAGES_REPO="${GITCODE_PAGES_REPO:-blog}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo ">>> 构建 VitePress 站点"
cd "$ROOT/vitepress"
npm ci
npm run docs:build

DIST="$ROOT/vitepress/docs/.vitepress/dist"
if [[ ! -f "$DIST/index.html" ]]; then
  echo "错误: 构建失败，未找到 $DIST/index.html"
  exit 1
fi

echo ""
echo ">>> 本地构建成功"
echo "    推荐：git push 到 GitCode，由 .gitlab-ci.yml 自动部署 Pages"
echo ""

if [[ "${1:-}" != "--push" ]]; then
  echo "若需手动推送静态文件到 Pages 仓库，请执行："
  echo "  export GITCODE_ORG=你的组织名   # Pages 需组织，见 GITCODE_DEPLOY.md"
  echo "  ./scripts/deploy-gitcode.sh --push"
  exit 0
fi

# Pages 在组织下时用 组织名/仓库名
if [[ -n "$GITCODE_ORG" ]]; then
  remote="git@${GITCODE_HOST}:${GITCODE_ORG}/${PAGES_REPO}.git"
  pages_url="https://${GITCODE_ORG}.gitcode.io/${PAGES_REPO}"
else
  remote="git@${GITCODE_HOST}:${GITCODE_USER}/${PAGES_REPO}.git"
  pages_url="https://${GITCODE_USER}.gitcode.io/${PAGES_REPO}"
fi

echo ">>> 部署到 $remote"
tmpdir=$(mktemp -d)
trap 'rm -rf "$tmpdir"' EXIT

cp -a "$DIST/." "$tmpdir/"
cd "$tmpdir"
git init -q
git checkout -b "$GITCODE_BRANCH" 2>/dev/null || git checkout "$GITCODE_BRANCH"
git add -A
git commit -q -m "deploy: vitepress $(date '+%Y-%m-%d %H:%M:%S')"

if git ls-remote --exit-code "$remote" &>/dev/null; then
  git push -f "$remote" "$GITCODE_BRANCH"
  echo ">>> 推送完成: ${pages_url}"
  echo "    请在 GitCode 项目「部署 → Pages」查看访问地址"
else
  echo "错误: 远程仓库 $remote 不存在或无法访问"
  echo "请先在 GitCode 创建公开仓库: ${PAGES_REPO}"
  echo "并配置 SSH：ssh -T git@${GITCODE_HOST}"
  exit 1
fi
