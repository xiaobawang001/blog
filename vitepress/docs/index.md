---
layout: home
markdownStyles: false

hero:
  name: 小霸王的知识库
  tagline: 服务器运维与开发笔记，边学边记，持续积累
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/site-features
    - theme: alt
      text: Docker 系列
      link: /server/1-docker/

features:
  - title: 🐳 Docker 运维
    details: 安装配置、镜像源加速、常用指令速查手册
    link: /server/1-docker/
  - title: 🐘 PostgreSQL
    details: Docker 部署 PostgreSQL，pgvector 向量扩展安装
    link: /server/1-docker/3-psql/
  - title: 🖥️ 1Panel 面板
    details: 服务器运维面板安装与使用
    link: /server/0-onepannel/
  - title: 📖 使用指南
    details: 站点功能介绍、Markdown 写作与发布流程
    link: /guide/
  - title: 💚 Vue 前端
    details: Vue.js 学习笔记与实战记录
    link: /frontend/vue/
  - title: ✨ 站点功能
    details: Mermaid 图表、PlantUML、代码块增强、全文搜索
    link: /guide/site-features
---

<div class="home-articles">
  <h2 class="home-section-title">📌 精选文章</h2>
  <div class="home-article-grid">

    <a class="home-article-card" href="/server/1-docker/2-指令">
      <h3>Docker 指令速查手册</h3>
      <p>涵盖镜像、容器、网络、数据卷等 10 大类常用 Docker 命令</p>
      <span class="home-tag">docker</span>
      <span class="home-tag">运维</span>
    </a>

    <a class="home-article-card" href="/server/1-docker/0-安装">
      <h3>Docker 安装指南</h3>
      <p>多种安装方式详解，快速搭建 Docker 环境</p>
      <span class="home-tag">docker</span>
      <span class="home-tag">运维</span>
    </a>

    <a class="home-article-card" href="/server/1-docker/3-psql/0psqlinstall">
      <h3>PostgreSQL 容器部署</h3>
      <p>使用 Docker 快速部署 PostgreSQL 数据库服务</p>
      <span class="home-tag">psql</span>
      <span class="home-tag">数据库</span>
    </a>

    <a class="home-article-card" href="/server/1-docker/3-psql/1pgvector">
      <h3>pgvector 向量扩展</h3>
      <p>为 PostgreSQL 安装 pgvector 扩展，支持向量检索</p>
      <span class="home-tag">psql</span>
      <span class="home-tag">数据库</span>
    </a>

    <a class="home-article-card" href="/guide/site-features">
      <h3>站点功能介绍</h3>
      <p>图表渲染、代码增强、全文搜索等特色功能一览</p>
      <span class="home-tag">指南</span>
      <span class="home-tag">功能</span>
    </a>

    <a class="home-article-card" href="/server/0-onepannel/0-安装">
      <h3>1Panel 运维面板</h3>
      <p>现代化服务器运维管理面板安装与使用</p>
      <span class="home-tag">1panel</span>
      <span class="home-tag">运维</span>
    </a>

  </div>
</div>
