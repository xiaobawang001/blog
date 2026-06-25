<script setup lang="ts">
import { useBackground } from '../composables/use-background'
import staticWallpaper from '../../../../static/background/静态壁纸.png'
import dynamicWallpaper from '../../../../static/background/动态壁纸.mp4'

const { bgMode } = useBackground()
</script>

<template>
  <div v-if="bgMode !== 'none'" class="PageBackground" aria-hidden="true">
    <video
      v-if="bgMode === 'dynamic'"
      class="bg-media"
      :src="dynamicWallpaper"
      autoplay
      loop
      muted
      playsinline
    />
    <img
      v-else
      class="bg-media"
      :src="staticWallpaper"
      alt=""
    />
  </div>
</template>

<style scoped>
.PageBackground {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.bg-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
