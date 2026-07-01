<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()
const progress = ref(0)

const visible = computed(() => {
  if (page.value.isNotFound) return false
  const layout = frontmatter.value.layout
  return !layout || layout === 'doc'
})

function updateProgress() {
  const doc = document.documentElement
  const scrollTop = window.scrollY || doc.scrollTop
  const scrollHeight = doc.scrollHeight - window.innerHeight
  progress.value = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <div
    v-if="visible"
    class="ReadingProgress"
    role="progressbar"
    :aria-valuenow="Math.round(progress)"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="阅读进度"
  >
    <div class="bar" :style="{ width: `${progress}%` }" />
  </div>
</template>

<style scoped>
.ReadingProgress {
  position: fixed;
  top: var(--vp-nav-height);
  left: 0;
  z-index: 30;
  width: 100%;
  height: 3px;
  background: transparent;
  pointer-events: none;
}

.bar {
  height: 100%;
  background: var(--yuque-brand);
  transition: width 0.12s ease-out;
  border-radius: 0 2px 2px 0;
}
</style>
