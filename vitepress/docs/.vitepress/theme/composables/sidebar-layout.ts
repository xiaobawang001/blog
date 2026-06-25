const TOOLBAR_MARKER = 'data-blog-sidebar-toolbar'

export function setupSidebarLayout() {
  if (typeof document === 'undefined') return

  const aside = document.querySelector<HTMLElement>('.VPSidebar')
  const nav = document.getElementById('VPSidebarNav')
  const toolbar = aside?.querySelector<HTMLElement>('.SidebarToolbar')

  if (!aside || !nav || !toolbar) return

  if (toolbar.getAttribute(TOOLBAR_MARKER) === 'moved') {
    if (toolbar.nextElementSibling === nav) return
  }

  if (toolbar.parentElement === nav) {
    aside.insertBefore(toolbar, nav)
    toolbar.setAttribute(TOOLBAR_MARKER, 'moved')
  }
}
