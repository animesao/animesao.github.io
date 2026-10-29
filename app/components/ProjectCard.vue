<script setup lang="ts">
import type { ProjectItem } from '~/data/projects'
import { useProjectVersions } from '~/composables/useProjectVersions'

const props = defineProps<{
  project: ProjectItem
}>()

const { locale, t } = useI18n()
const localePath = useLocalePath()
const { getVersion } = useProjectVersions()

const liveVersion = computed(() => {
  return getVersion(props.project.slug) || props.project.versionBadge
})

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
  <article class="flex flex-col rounded-xl border border-white/[0.08] bg-[#14161f] card-sheen p-6 hover:border-amber-500/50 hover:bg-[#1a1d28] hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/30 group">
    <!-- Top Meta Row -->
    <header class="flex items-start justify-between gap-3 mb-4">
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="px-2.5 py-0.5 rounded text-[11px] font-mono border card-sheen"
          :class="statusClasses"
        >
          {{ project.statusLabel[locale as 'ru' | 'en'] }}
        </span>
        <span
          v-if="liveVersion"
          class="px-2 py-0.5 rounded text-[11px] font-mono bg-[#1b1e2a] border border-white/[0.1] text-zinc-300 flex items-center gap-1.5 card-sheen"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {{ liveVersion }}
        </span>
      </div>

      <!-- Action links -->
      <div class="flex items-center gap-2">
        <a
          v-if="project.links.website"
          :href="project.links.website"
          target="_blank"
          rel="noopener noreferrer"
          class="p-1.5 rounded-lg border border-white/[0.08] bg-[#1b1e2a] text-zinc-400 hover:text-white hover:border-amber-500/40 transition-colors card-sheen"
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
          class="p-1.5 rounded-lg border border-white/[0.08] bg-[#1b1e2a] text-zinc-400 hover:text-white hover:border-amber-500/40 transition-colors card-sheen"
          :aria-label="project.name + ' GitHub Repository'"
        >
          <UIcon
            name="i-simple-icons-github"
            class="w-4 h-4"
          />
        </a>
      </div>
    </header>

    <!-- Title & Role -->
    <div class="mb-3">
      <h3 class="text-xl font-bold font-mono text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
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
        class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1b1e2a] text-zinc-300 border border-white/[0.08] card-sheen"
      >
        {{ tech }}
      </span>
    </div>

    <!-- Bottom Action -->
    <footer class="pt-4 border-t border-white/[0.08] flex items-center justify-between">
      <NuxtLink
        :to="localePath('/projects/' + project.slug)"
        class="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-amber-300 font-semibold group/link"
      >
        <span>{{ t('common.readMore') }}</span>
        <UIcon
          name="i-lucide-arrow-right"
          class="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1"
        />
      </NuxtLink>

      <span class="text-[10px] font-mono text-zinc-500 uppercase">
        {{ project.ecosystemRole }}
      </span>
    </footer>
  </article>
</template>
