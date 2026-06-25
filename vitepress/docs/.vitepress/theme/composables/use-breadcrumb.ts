import { useData } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared.js'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar.js'
import type { DefaultTheme } from 'vitepress/theme'
import { computed } from 'vue'

function findBreadcrumb(
  items: DefaultTheme.SidebarItem[],
  relativePath: string,
  trail: string[] = [],
): string[] | null {
  for (const item of items) {
    const label = item.text?.trim()

    if (item.items?.length) {
      const childTrail = label ? [...trail, label] : trail
      const found = findBreadcrumb(item.items, relativePath, childTrail)
      if (found) return found
    }

    if (item.link && isActive(relativePath, item.link)) {
      return label ? [...trail, label] : trail
    }
  }

  return null
}

export function useBreadcrumb() {
  const { page, frontmatter } = useData()
  const { sidebar, hasSidebar } = useSidebar()

  const crumbs = computed(() => {
    if (!hasSidebar.value || frontmatter.value.layout === 'home') {
      return [] as string[]
    }

    const path = findBreadcrumb(sidebar.value, page.value.relativePath)
    if (path?.length) return path

    const title = page.value.title || frontmatter.value.title
    return title ? [String(title)] : []
  })

  const visible = computed(() => crumbs.value.length > 0)

  return { crumbs, visible }
}
