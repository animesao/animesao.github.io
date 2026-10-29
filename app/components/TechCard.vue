<script setup lang="ts">
import type { TechItem } from '~/data/techStack'

const props = defineProps<{
  item: TechItem
}>()

const { locale } = useI18n()

const statusClasses = computed(() => {
  switch (props.item.status) {
    case 'in-projects':
      return 'bg-sky-500/10 text-sky-400 border-sky-500/20'
    case 'current-stack':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    case 'planned':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    case 'learning':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    default:
      return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  }
})
</script>

<template>
  <div class="flex flex-col rounded-lg border border-white/10 bg-[#0d0f17] p-5 hover:border-white/25 transition-colors">
    <div class="flex items-center justify-between gap-3 mb-3">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded bg-white/5 border border-white/10 text-white">
          <UIcon
            :name="item.icon"
            class="w-5 h-5"
          />
        </div>
        <h4 class="text-sm font-bold font-mono text-white">
          {{ item.name }}
        </h4>
      </div>
      <span
        class="px-2 py-0.5 rounded text-[10px] font-mono border"
        :class="statusClasses"
      >
        {{ item.statusLabel[locale as 'ru' | 'en'] }}
      </span>
    </div>

    <p class="text-xs text-zinc-300 leading-relaxed font-sans">
      {{ item.context[locale as 'ru' | 'en'] }}
    </p>
  </div>
</template>
