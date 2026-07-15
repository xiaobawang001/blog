<script setup lang="ts">
import { useBlogUi } from '../composables/blog-ui'
import { FileText, LocateFixed, ChevronUp, ChevronDown } from '@lucide/vue'

const { foldersExpanded, scrollToActiveDoc, toggleAllFolders } = useBlogUi()
</script>

<template>
  <div class="SidebarToolbar" role="toolbar" aria-label="侧边栏工具">
    <div class="tb-left">
      <FileText class="tb-icon" :size="16" />
      <span class="tb-label">文档目录</span>
    </div>
    <div class="tb-actions">
      <el-tooltip content="定位到当前文档" :show-after="400">
        <el-button text circle size="small" class="tb-btn" @click="scrollToActiveDoc">
          <LocateFixed :size="16" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="foldersExpanded ? '折叠全部分类' : '展开全部分类'" :show-after="400">
        <el-button text circle size="small" class="tb-btn" @click="toggleAllFolders">
          <ChevronUp v-if="foldersExpanded" :size="16" />
          <ChevronDown v-else :size="16" />
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped>
.SidebarToolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0 calc(-1 * var(--vp-sidebar-padding-x));
  padding: 0 var(--vp-sidebar-padding-x);
  border-bottom: 1px solid var(--vp-c-divider);
  background: transparent;
  box-sizing: border-box;
  min-height: 40px;
  flex-shrink: 0;
}
.tb-left { display: inline-flex; align-items: center; gap: 6px; min-width: 0; }
.tb-label { font-size: 15px; font-weight: 600; color: var(--vp-c-text-1); white-space: nowrap; }
.tb-actions { display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0; }
.tb-icon { display: inline-flex; align-items: center; justify-content: center; line-height: 0; flex-shrink: 0; }
.tb-btn { width: 28px; height: 28px; }
</style>
