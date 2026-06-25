import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import DocOutlineItem from './components/DocOutlineItem.vue'
import { applyBackgroundClasses, bgMode, clampOpacity, uiOpacity } from './composables/use-background'
import './custom.css'

function initBackgroundFromStorage() {
  if (typeof localStorage === 'undefined') return
  const savedMode = localStorage.getItem('blog-bg-mode')
  if (savedMode === 'static' || savedMode === 'dynamic' || savedMode === 'none') {
    bgMode.value = savedMode
  }
  if (bgMode.value === 'none') {
    uiOpacity.value = 1
    return
  }
  const isDark =
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
  const savedOpacity = Number.parseFloat(localStorage.getItem('blog-ui-opacity') ?? '1')
  if (Number.isFinite(savedOpacity)) {
    uiOpacity.value = clampOpacity(savedOpacity, isDark)
  }
}

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('VPDocOutlineItem', DocOutlineItem)
    initBackgroundFromStorage()
    if (typeof document !== 'undefined') applyBackgroundClasses()
  },
}
