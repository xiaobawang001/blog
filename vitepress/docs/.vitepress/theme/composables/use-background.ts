import { computed, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

export type BackgroundMode = 'static' | 'dynamic' | 'none'

export const BG_MODE_ORDER: BackgroundMode[] = ['static', 'dynamic', 'none']

export const BG_MODE_LABEL: Record<BackgroundMode, string> = {
  static: '图片背景',
  dynamic: '视频背景',
  none: '无背景',
}

export const OPACITY_MIN = 0.55
export const OPACITY_MAX_LIGHT = 0.85
export const OPACITY_MAX_DARK = 1

const STORAGE_MODE = 'blog-bg-mode'
const STORAGE_OPACITY = 'blog-ui-opacity'

export const bgMode = ref<BackgroundMode>('static')
export const uiOpacity = ref(1)

export function getOpacityMax(isDark: boolean) {
  return isDark ? OPACITY_MAX_DARK : OPACITY_MAX_LIGHT
}

export function clampOpacity(value: number, isDark: boolean) {
  return Math.min(getOpacityMax(isDark), Math.max(OPACITY_MIN, value))
}

function readIsDark() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

function readMode(): BackgroundMode {
  if (typeof localStorage === 'undefined') return 'static'
  const saved = localStorage.getItem(STORAGE_MODE)
  if (saved === 'static' || saved === 'dynamic' || saved === 'none') return saved
  return 'static'
}

function readOpacity(isDark = readIsDark()): number {
  if (typeof localStorage === 'undefined') return 1
  const saved = Number.parseFloat(localStorage.getItem(STORAGE_OPACITY) ?? '1')
  if (!Number.isFinite(saved)) return 1
  return clampOpacity(saved, isDark)
}

export function applyBackgroundClasses() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const wallpaperActive = bgMode.value !== 'none'

  root.classList.toggle('blog-wallpaper-active', wallpaperActive)
  root.classList.toggle('blog-bg-static', bgMode.value === 'static')
  root.classList.toggle('blog-bg-dynamic', bgMode.value === 'dynamic')
  root.classList.toggle('blog-bg-none', bgMode.value === 'none')
  root.style.setProperty('--blog-ui-opacity', String(uiOpacity.value))
}

export function useBackground() {
  const { isDark } = useData()

  const opacityMax = computed(() => getOpacityMax(isDark.value))

  function syncOpacityToBounds() {
    if (bgMode.value === 'none') {
      if (uiOpacity.value !== 1) uiOpacity.value = 1
      return
    }
    const clamped = clampOpacity(uiOpacity.value, isDark.value)
    if (clamped !== uiOpacity.value) uiOpacity.value = clamped
  }

  onMounted(() => {
    bgMode.value = readMode()
    uiOpacity.value = bgMode.value === 'none' ? 1 : readOpacity(isDark.value)
    syncOpacityToBounds()
    applyBackgroundClasses()
  })

  watch(isDark, () => syncOpacityToBounds())

  watch(bgMode, (mode, prevMode) => {
    if (mode === 'none') {
      uiOpacity.value = 1
    } else if (prevMode === 'none') {
      uiOpacity.value = clampOpacity(uiOpacity.value, isDark.value)
    }
    localStorage.setItem(STORAGE_MODE, mode)
    applyBackgroundClasses()
  })

  watch(uiOpacity, (value) => {
    const clamped = bgMode.value === 'none' ? 1 : clampOpacity(value, isDark.value)
    if (clamped !== value) {
      uiOpacity.value = clamped
      return
    }
    localStorage.setItem(STORAGE_OPACITY, String(clamped))
    applyBackgroundClasses()
  })

  function setBgMode(mode: BackgroundMode) {
    bgMode.value = mode
  }

  function cycleBgMode() {
    const index = BG_MODE_ORDER.indexOf(bgMode.value)
    const next = BG_MODE_ORDER[(index + 1) % BG_MODE_ORDER.length]
    bgMode.value = next
  }

  return {
    bgMode,
    uiOpacity,
    opacityMax,
    setBgMode,
    cycleBgMode,
    applyBackgroundClasses,
  }
}
