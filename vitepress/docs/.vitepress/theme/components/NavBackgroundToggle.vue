<script setup lang="ts">
import { computed } from 'vue'
import { useBackground, BG_MODE_LABEL, type BackgroundMode } from '../composables/use-background'
import { toIconSvg } from '../utils/icon'
import imageBgIconRaw from '../../../../static/navigatebar/图片背景.svg?raw'
import videoBgIconRaw from '../../../../static/navigatebar/视频背景.svg?raw'
import noBgIconRaw from '../../../../static/navigatebar/无背景.svg?raw'

const BG_MODE_ICON: Record<BackgroundMode, string> = {
  static: imageBgIconRaw,
  dynamic: videoBgIconRaw,
  none: noBgIconRaw,
}

const { bgMode, cycleBgMode } = useBackground()

const bgModeLabel = computed(() => BG_MODE_LABEL[bgMode.value])
const currentBgIcon = computed(() => toIconSvg(BG_MODE_ICON[bgMode.value]))
</script>

<template>
  <div class="NavBackgroundToggle" role="group" aria-label="背景设置">
    <button
      type="button"
      class="nav-icon-btn"
      :title="`${bgModeLabel}（点击切换）`"
      :aria-label="`${bgModeLabel}，点击切换背景`"
      @click="cycleBgMode"
    >
      <span class="nav-icon" v-html="currentBgIcon" />
    </button>
  </div>
</template>

<style scoped>
.NavBackgroundToggle {
  display: none;
  align-items: center;
  margin-left: 6px;
  padding-left: 10px;
  border-left: 1px solid var(--vp-c-divider);
}

@media (min-width: 768px) {
  .NavBackgroundToggle {
    display: flex;
  }
}

.nav-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.nav-icon-btn:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.nav-icon {
  display: inline-flex;
  line-height: 0;
}

.nav-icon :deep(svg) {
  display: block;
  width: 18px;
  height: 18px;
}
</style>
