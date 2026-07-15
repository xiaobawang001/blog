import{_ as s,o as n,c as i,aS as t}from"./chunks/framework.DdSiWJCR.js";const m=JSON.parse('{"title":"站点功能","description":"","frontmatter":{},"headers":[],"relativePath":"使用指南/站点功能.md","filePath":"使用指南/站点功能.md","lastUpdated":null}'),e={name:"使用指南/站点功能.md"};function r(l,a,p,o,d,h){return n(),i("div",null,[...a[0]||(a[0]=[t(`<h1 id="站点功能" tabindex="-1">站点功能 <a class="header-anchor" href="#站点功能" aria-label="Permalink to &quot;站点功能&quot;">​</a></h1><h2 id="锚点分享" tabindex="-1">锚点分享 <a class="header-anchor" href="#锚点分享" aria-label="Permalink to &quot;锚点分享&quot;">​</a></h2><p>将鼠标悬停在任意标题上，点击右侧链接图标即可复制该章节的直达链接。</p><h2 id="mermaid-图表" tabindex="-1">Mermaid 图表 <a class="header-anchor" href="#mermaid-图表" aria-label="Permalink to &quot;Mermaid 图表&quot;">​</a></h2><p>在 Markdown 中使用 <code>mermaid</code> 代码块即可绘制流程图：</p><pre class="mermaid">graph LR
  A[编写 Markdown] --&gt; B[推送到 GitHub]
  B --&gt; C[自动构建发布]
  C --&gt; D[在线阅读]
</pre><p>序列图示例：</p><pre class="mermaid">sequenceDiagram
  participant U as 作者
  participant G as GitHub
  participant P as GitHub Pages
  U-&gt;&gt;G: git push
  G-&gt;&gt;P: Actions 构建
  P--&gt;&gt;U: 站点更新
</pre><h2 id="plantuml-图表" tabindex="-1">PlantUML 图表 <a class="header-anchor" href="#plantuml-图表" aria-label="Permalink to &quot;PlantUML 图表&quot;">​</a></h2><p>使用 <code>plantuml</code> 代码块（通过 Kroki 渲染，需联网）：</p><figure class="plantuml-wrap"><img class="plantuml-diagram" data-plantuml-encoded="SoWkIImgAStDuKfCBialKdYnVlUBXbQkWiIYaipap8B4l1A5vwjdFc_QoGMHKT2rWmfOAJphdFnqJyEpQUtF5YxcWWWgwEhQGSsmKdYnVyhJsVDUBjpwSkuYBeVKl9JIt1m0" data-plantuml-source="@startuml
actor 读者
participant 站点
读者 -&gt; 站点: 打开文档
站点 --&gt; 读者: 返回页面
@enduml
" src="https://kroki.io/plantuml/svg/SoWkIImgAStDuKfCBialKdYnVlUBXbQkWiIYaipap8B4l1A5vwjdFc_QoGMHKT2rWmfOAJphdFnqJyEpQUtF5YxcWWWgwEhQGSsmKdYnVyhJsVDUBjpwSkuYBeVKl9JIt1m0" alt="PlantUML 图表" loading="lazy"></figure><h2 id="graphviz-图表" tabindex="-1">Graphviz 图表 <a class="header-anchor" href="#graphviz-图表" aria-label="Permalink to &quot;Graphviz 图表&quot;">​</a></h2><p>使用 <code>dot</code> 或 <code>graphviz</code> 代码块：</p><pre class="graphviz">digraph G {
  rankdir=LR
  写作 -&gt; 推送 -&gt; 构建 -&gt; 发布
}
</pre><h2 id="代码块增强" tabindex="-1">代码块增强 <a class="header-anchor" href="#代码块增强" aria-label="Permalink to &quot;代码块增强&quot;">​</a></h2><p>所有代码块默认显示<strong>行号</strong>。标题栏提供：</p><ul><li><strong>复制</strong> — 一键复制代码</li><li><strong>换行</strong> — 切换长行自动换行（默认横向滚动）</li><li><strong>折叠</strong> — 超过 18 行的代码块可折叠展开</li></ul><p>点击任意代码行可<strong>高亮当前行</strong>（再次点击取消）。</p><p>在代码块语言后标注行号可静态高亮，例如：</p><div class="language-md vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`json {5-8}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &quot;registry-mirrors&quot;: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &quot;https://docker.example.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,20)])])}const u=s(e,[["render",r]]);export{m as __pageData,u as default};
