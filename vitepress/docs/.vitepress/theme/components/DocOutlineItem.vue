<script setup lang="ts">
import type { MenuItem } from 'vitepress/dist/client/theme-default/composables/outline.js'
import { scrollToDocHeading } from '../composables/outline-nav'

defineOptions({ name: 'VPDocOutlineItem' })

defineProps<{
  headers: MenuItem[]
  root?: boolean
}>()

function onLinkClick(e: MouseEvent) {
  const link = e.currentTarget as HTMLAnchorElement
  const id =
    link.hash.replace(/^#/, '') ||
    link.getAttribute('href')?.split('#').pop() ||
    ''

  if (!id) return

  e.preventDefault()
  e.stopImmediatePropagation()
  scrollToDocHeading(id)
}
</script>

<template>
  <ul class="VPDocOutlineItem" :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title } in headers" :key="link">
      <a class="outline-link" :href="link" :title="title" @click="onLinkClick">{{ title }}</a>
      <VPDocOutlineItem v-if="children?.length" :headers="children" />
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-right: 16px;
  padding-left: 16px;
}

.outline-link {
  display: block;
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.5s;
}

.outline-link:hover,
.outline-link.active {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.outline-link.nested {
  padding-left: 13px;
}
</style>
