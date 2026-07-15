<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'
import { ArrowUp } from '@lucide/vue'

const { frontmatter, page } = useData()
const show = ref(false)

const visible = computed(() => {
  if (page.value.isNotFound) return false
  const layout = frontmatter.value.layout
  return !layout || layout === 'doc'
})

function onScroll() { show.value = window.scrollY > 320 }

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <el-tooltip v-if="visible" content="回到顶部" :show-after="500" placement="left">
    <el-button v-show="show" circle size="small" class="btt-btn" @click="scrollToTop">
      <ArrowUp :size="18" />
    </el-button>
  </el-tooltip>
</template>

<style scoped>
.btt-btn {
  position: fixed;
  right: 24px;
  bottom: 32px;
  z-index: 40;
  width: 40px;
  height: 40px;
}
@media (max-width: 767px) {
  .btt-btn { right: 16px; bottom: 24px; }
}
</style>
