<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import siteAvatar from '../../../static/navigatebar/头像.jpg'
import NavBreadcrumb from './components/NavBreadcrumb.vue'
import NavBackgroundToggle from './components/NavBackgroundToggle.vue'
import NavOpacityControl from './components/NavOpacityControl.vue'
import PageBackground from './components/PageBackground.vue'
import SidebarToolbar from './components/SidebarToolbar.vue'
import OutlineToolbar from './components/OutlineToolbar.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import BackToTop from './components/BackToTop.vue'
import { applyBackgroundClasses } from './composables/use-background'
import { clearForcedFolderCollapse } from './composables/blog-ui'
import { setupOutlineNavigation } from './composables/outline-nav'
import { setupSidebarLayout } from './composables/sidebar-layout'

const { Layout: DefaultLayout } = DefaultTheme
const route = useRoute()

let removeSidebarNavClick: (() => void) | null = null
let removeOutlineNavigation: (() => void) | null = null

function bindSidebarNavClick() {
  const onSidebarNavClick = (e: MouseEvent) => {
    const target = e.target as Element
    if (target.closest('.SidebarToolbar')) return
    if (target.closest('.VPSidebarItem')) clearForcedFolderCollapse()
  }

  const nav = document.getElementById('VPSidebarNav')
  if (!nav) return

  removeSidebarNavClick?.()
  nav.addEventListener('click', onSidebarNavClick, true)
  removeSidebarNavClick = () => nav.removeEventListener('click', onSidebarNavClick, true)
}

function refreshSidebarLayout() {
  nextTick(() => {
    setupSidebarLayout()
    bindSidebarNavClick()
  })
}

onMounted(() => {
  applyBackgroundClasses()
  refreshSidebarLayout()
  removeOutlineNavigation = setupOutlineNavigation()
})

watch(() => route.path, refreshSidebarLayout)

onUnmounted(() => {
  removeSidebarNavClick?.()
  removeOutlineNavigation?.()
})
</script>

<template>
  <PageBackground />
  <ReadingProgress />
  <BackToTop />
  <DefaultLayout>
    <template #nav-bar-title-before>
      <img class="site-avatar" :src="siteAvatar" alt="" width="40" height="40" />
    </template>
    <template #nav-bar-content-before>
      <NavBreadcrumb />
    </template>
    <template #nav-bar-content-after>
      <NavBackgroundToggle />
      <NavOpacityControl />
    </template>
    <template #sidebar-nav-before>
      <SidebarToolbar />
    </template>
    <template #aside-outline-before>
      <OutlineToolbar />
    </template>
  </DefaultLayout>
</template>
