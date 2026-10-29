<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showStatus?: boolean
  }>(),
  {
    size: 'md',
    showStatus: true
  }
)

const imageLoaded = ref(true)

function onImageError() {
  imageLoaded.value = false
}

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-8 h-8 rounded-lg'
    case 'lg':
      return 'w-16 h-16 rounded-2xl'
    case 'xl':
      return 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl'
    case 'md':
    default:
      return 'w-12 h-12 rounded-xl'
  }
})
</script>

<template>
  <div class="relative inline-flex shrink-0 select-none">
    <!-- Outer sci-fi frame -->
    <div
      class="relative overflow-hidden border border-white/20 bg-[#0d0f17] flex items-center justify-center p-0.5 transition-all group-hover:border-sky-400/50"
      :class="sizeClasses"
    >
      <!-- Try loading custom avatar (png / svg) -->
      <img
        v-if="imageLoaded"
        src="/custom/avatar.svg"
        alt="animesao avatar"
        class="w-full h-full object-cover rounded-[inherit]"
        loading="eager"
        @error="onImageError"
      >

      <!-- Fallback Monogram if image failed or empty -->
      <div
        v-else
        class="w-full h-full rounded-[inherit] bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center font-mono font-bold text-sky-400"
      >
        <span>A</span>
      </div>
    </div>

    <!-- Live indicator dot -->
    <span
      v-if="showStatus"
      class="absolute -bottom-1 -right-1 flex h-3.5 w-3.5"
    >
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#090a0f]" />
    </span>
  </div>
</template>
