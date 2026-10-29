<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    showText?: boolean
  }>(),
  {
    size: 'md',
    showText: true
  }
)

const logoSources = [
  '/custom/logo.png',
  '/custom/logo.jpg',
  '/custom/logo.svg'
]

const currentSrcIndex = ref(0)
const hasValidLogo = ref(true)

const currentSrc = computed(() => {
  return logoSources[currentSrcIndex.value] || ''
})

function onLogoError() {
  if (currentSrcIndex.value < logoSources.length - 1) {
    currentSrcIndex.value++
  } else {
    hasValidLogo.value = false
  }
}

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        box: 'w-8 h-8 rounded-lg',
        text: 'text-sm',
        tag: 'text-[9px]',
        dot: 'w-2 h-2',
        fallback: 'text-xs'
      }
    case 'lg':
      return {
        box: 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl',
        text: 'text-lg sm:text-xl',
        tag: 'text-xs',
        dot: 'w-3 h-3',
        fallback: 'text-base sm:text-lg'
      }
    case 'md':
    default:
      return {
        box: 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl',
        text: 'text-base sm:text-lg',
        tag: 'text-[11px]',
        dot: 'w-2.5 h-2.5',
        fallback: 'text-sm sm:text-base'
      }
  }
})
</script>

<template>
  <div class="inline-flex items-center gap-3 font-mono select-none group shrink-0">
    <div
      class="relative flex items-center justify-center border border-white/[0.14] bg-[#14161f] card-sheen transition-all duration-200 group-hover:border-amber-500/60 group-hover:bg-[#1b1e2a] group-hover:shadow-lg group-hover:shadow-amber-500/15 overflow-hidden shadow-sm shrink-0"
      :class="sizeClasses.box"
    >
      <img
        v-if="hasValidLogo"
        :src="currentSrc"
        alt="animesao Logo"
        class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        @error="onLogoError"
      >
      <span
        v-else
        class="font-bold text-amber-400 font-mono transition-transform group-hover:scale-110"
        :class="sizeClasses.fallback"
      >
        A
      </span>
      <span
        class="absolute -bottom-0.5 -right-0.5 rounded-full bg-emerald-400 ring-2 ring-[#10121a]"
        :class="sizeClasses.dot"
      />
    </div>
    <div
      v-if="showText"
      class="flex items-baseline gap-2"
    >
      <span
        class="font-bold tracking-wider text-white group-hover:text-amber-200 transition-colors"
        :class="sizeClasses.text"
      >
        ANIMESAO
      </span>
      <span
        class="text-zinc-500 tracking-widest hidden sm:inline-block font-mono"
        :class="sizeClasses.tag"
      >
        // DEV
      </span>
    </div>
  </div>
</template>
