<script setup lang="ts">
import type { TechItem } from '~/data/techStack'

const props = defineProps<{
  item: TechItem
}>()

const { locale } = useI18n()

const statusClasses = computed(() => {
  switch (props.item.status) {
    case 'in-projects':
      return 'bg-sky-500/10 text-sky-400 border-sky-500/25'
    case 'current-stack':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
    case 'planned':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/25'
    case 'learning':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/25'
    default:
      return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/25'
  }
})
</script>

<template>
  <div class="flex flex-col rounded-xl border border-[#252a38] bg-[#141722] p-5 hover:border-[#3e4860] hover:bg-[#181c29] transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-black/20 group">
    <div class="flex items-center justify-between gap-3 mb-3">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-[#1c2130] border border-[#2b3346] text-white group-hover:text-sky-400 transition-colors">
          <UIcon
            :name="item.icon"
            class="w-5 h-5"
          />
        </div>
        <h4 class="text-sm font-bold font-mono text-white group-hover:text-sky-300 transition-colors">
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
