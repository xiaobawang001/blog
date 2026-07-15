function findHeading(id: string): HTMLElement | null {
  const decoded = decodeURIComponent(id)

  const byId = document.getElementById(decoded)
  if (byId) return byId

  try {
    const inDoc = document.querySelector<HTMLElement>(
      `.vp-doc #${CSS.escape(decoded)}`,
    )
    if (inDoc) return inDoc
  } catch {
    // ignore invalid selector
  }

  return document.querySelector<HTMLElement>(`[id="${decoded}"]`)
}

function getScrollOffset() {
  const navHeight = Number.parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--vp-nav-height'),
    10,
  )
  return (Number.isFinite(navHeight) ? navHeight : 56) + 12
}

export function scrollToDocHeading(id: string, behavior: ScrollBehavior = 'smooth') {
  const heading = findHeading(id)
  if (!heading) return false

  const top = heading.getBoundingClientRect().top + window.pageYOffset - getScrollOffset()
  window.scrollTo({ top: Math.max(0, top), behavior })

  const hash = encodeURIComponent(heading.id)
  history.replaceState(null, '', `${location.pathname}${location.search}#${hash}`)
  heading.focus({ preventScroll: true })

  return true
}

function handleOutlineClick(e: MouseEvent) {
  const link = (e.target as Element).closest<HTMLAnchorElement>(
    '.VPDocAsideOutline a.outline-link',
  )
  if (!link) return

  const rawId =
    link.hash.replace(/^#/, '') ||
    link.getAttribute('href')?.split('#').pop() ||
    ''

  if (!rawId) return

  e.preventDefault()
  e.stopImmediatePropagation()
  scrollToDocHeading(rawId)
}

export function setupOutlineNavigation() {
  document.addEventListener('click', handleOutlineClick, true)
  return () => document.removeEventListener('click', handleOutlineClick, true)
}
