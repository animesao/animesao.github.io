<script setup lang="ts">
import { ref } from 'vue'

const hasCustomLogo = ref(true)

function onLogoError() {
  hasCustomLogo.value = false
}
</script>

<template>
  <div class="inline-flex items-center gap-2.5 font-mono select-none group">
    <div class="relative flex items-center justify-center w-7 h-7 rounded-lg border border-[#2b3346] bg-[#141722] transition-all duration-200 group-hover:border-sky-400/60 group-hover:bg-[#1c2232] overflow-hidden shadow-sm">
      <img
        v-if="hasCustomLogo"
        src="/custom/logo.svg"
        alt="Logo"
        class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        @error="onLogoError"
      >
      <span
        v-else
        class="text-xs font-bold text-sky-400 transition-transform group-hover:scale-110"
      >
        A
      </span>
      <span class="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
    </div>
    <div class="flex items-baseline gap-1.5">
      <span class="font-bold tracking-wider text-white text-base group-hover:text-sky-300 transition-colors">ANIMESAO</span>
      <span class="text-[10px] text-zinc-500 tracking-widest hidden sm:inline-block">// DEV</span>
    </div>
  </div>
</template>
