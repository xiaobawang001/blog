<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'
import { getPageMeta } from 'virtual:blog-meta'

const route = useRoute()
const tags = computed(() => getPageMeta(route.path)?.tags ?? [])
</script>

<template>
  <div v-if="tags.length" class="DocTags">
    <span class="DocTags-label">标签</span>
    <el-tag
      v-for="tag in tags"
      :key="tag"
      class="DocTags-tag"
      @click="() => { location.href = withBase(`/sitemap?tag=${encodeURIComponent(tag)}`) }"
    >
      {{ tag }}
    </el-tag>
  </div>
</template>

<style scoped>
.DocTags { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 0 0 20px; padding-bottom: 16px; border-bottom: 1px solid var(--yuque-border-light); }
.DocTags-label { font-size: 13px; font-weight: 600; color: var(--yuque-text-secondary); }
.DocTags-tag { cursor: pointer; }
</style>
