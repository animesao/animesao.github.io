<script setup lang="ts">
import type { ProjectItem } from '~/data/projects'

const props = defineProps<{
  project: ProjectItem
}>()

const { locale, t } = useI18n()
const localePath = useLocalePath()

const statusClasses = computed(() => {
  switch (props.project.status) {
    case 'active-dev':
    case 'released':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    case 'planned':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    default:
      return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30'
  }
})
</script>

<template>
  <div class="flex flex-col rounded-xl border border-white/10 bg-[#0d0f17] p-6 hover:border-white/25 transition-all duration-200 group">
    <!-- Top Meta Row -->
    <div class="flex items-start justify-between gap-3 mb-4">
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="px-2.5 py-0.5 rounded text-[11px] font-mono border"
          :class="statusClasses"
        >
          {{ project.statusLabel[locale as 'ru' | 'en'] }}
        </span>
        <span
          v-if="project.versionBadge"
          class="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-300"
        >
          {{ project.versionBadge }}
        </span>
      </div>

      <!-- Action links -->
      <div class="flex items-center gap-2">
        <a
          v-if="project.links.website"
          :href="project.links.website"
          target="_blank"
          rel="noopener noreferrer"
          class="p-1.5 rounded-md border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
          :aria-label="project.name + ' Website'"
        >
          <UIcon
            name="i-lucide-external-link"
            class="w-4 h-4"
          />
        </a>
        <a
          v-if="project.links.github"
          :href="project.links.github"
          target="_blank"
          rel="noopener noreferrer"
          class="p-1.5 rounded-md border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
          :aria-label="project.name + ' GitHub Repository'"
        >
          <UIcon
            name="i-simple-icons-github"
            class="w-4 h-4"
          />
        </a>
      </div>
    </div>

    <!-- Title & Role -->
    <div class="mb-3">
      <h3 class="text-xl font-bold font-mono text-white group-hover:text-sky-300 transition-colors flex items-center gap-2">
        <span>{{ project.name }}</span>
      </h3>
      <p class="text-xs font-mono text-zinc-400 mt-1">
        {{ project.role[locale as 'ru' | 'en'] }}
      </p>
    </div>

    <!-- Summary -->
    <p class="text-xs text-zinc-300 leading-relaxed mb-6 flex-1">
      {{ project.summary[locale as 'ru' | 'en'] }}
    </p>

    <!-- Technologies -->
    <div class="flex flex-wrap gap-1.5 mb-6">
      <span
        v-for="tech in project.technologies"
        :key="tech"
        class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400"
      >
        {{ tech }}
      </span>
    </div>

    <!-- Bottom Action -->
    <div class="pt-4 border-t border-white/10 flex items-center justify-between">
      <span class="text-[11px] font-mono text-zinc-500">
        {{ project.license }}
      </span>
      <NuxtLink
        :to="localePath(`/projects/${project.slug}`)"
        class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white group-hover:text-sky-300 transition-colors"
      >
        <span>{{ t('common.readMore') }}</span>
        <UIcon
          name="i-lucide-arrow-right"
          class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
        />
      </NuxtLink>
    </div>
  </div>
</template>
