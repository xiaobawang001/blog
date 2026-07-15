<script setup lang="ts">
import { useBlogUi } from '../composables/blog-ui'
import { ChevronUp, ChevronDown } from '@lucide/vue'

const { outlineExpanded, toggleOutline } = useBlogUi()
</script>

<template>
  <div class="OutlineToolbar" role="toolbar" aria-label="文章目录工具">
    <span class="tb-label">文章目录</span>
    <el-tooltip :content="outlineExpanded ? '折叠目录' : '展开目录'" :show-after="400">
      <el-button text circle size="small" class="tb-btn" @click="toggleOutline">
        <ChevronUp v-if="outlineExpanded" :size="16" />
        <ChevronDown v-else :size="16" />
      </el-button>
    </el-tooltip>
  </div>
</template>

<style scoped>
.OutlineToolbar {
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  margin-bottom: 8px; padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider); min-height: 32px;
}
.tb-label { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); white-space: nowrap; }
.tb-btn { width: 28px; height: 28px; }
</style>
