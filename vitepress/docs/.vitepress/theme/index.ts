import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import DocOutlineItem from './components/DocOutlineItem.vue'
import { initFontSizeFromStorage } from './composables/use-font-size'
import { initContentWidthFromStorage } from './composables/use-content-width'
import { initFocusModeFromStorage } from './composables/use-focus-mode'
import { initSidebarPersistFromStorage } from './composables/use-sidebar-persist'
import 'element-plus/dist/index.css'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout,
  NotFound,
  enhanceApp({ app }) {
    app.provide(ID_INJECTION_KEY, { prefix: 100, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
    app.use(ElementPlus)
    app.component('VPDocOutlineItem', DocOutlineItem)
    initFontSizeFromStorage()
    initContentWidthFromStorage()
    initFocusModeFromStorage()
    initSidebarPersistFromStorage()
  },
}
