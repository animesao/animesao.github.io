<script setup lang="ts">
import { computed } from 'vue'
import { projectsData } from '~/data/projects'
import { useProjectVersions } from '~/composables/useProjectVersions'

const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { getVersion } = useProjectVersions()

const slug = computed(() => route.params.slug as string)
const project = computed(() => projectsData.find(p => p.slug === slug.value))

const liveVersion = computed(() => {
  if (!project.value) return ''
  return getVersion(project.value.slug) || project.value.versionBadge
})

const statusClasses = computed(() => {
  if (!project.value) return ''
  switch (project.value.status) {
    case 'active-dev':
    case 'released':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    case 'planned':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    default:
      return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30'
  }
})

useSeoMeta({
  title: () => project.value
    ? `${project.value.name} · animesao`
    : 'Проект не найден · animesao',
  description: () => project.value
    ? project.value.summary[locale.value as 'ru' | 'en']
    : 'Запрошенный проект не найден',
  ogTitle: () => project.value ? project.value.name : 'animesao',
  ogDescription: () => project.value ? project.value.summary[locale.value as 'ru' | 'en'] : ''
})
</script>

<template>
  <div>
    <div
      v-if="project"
      class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12"
    >
      <!-- Back Navigation -->
      <div>
        <NuxtLink
          :to="localePath('/projects')"
          class="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="w-3.5 h-3.5"
          />
          <span>{{ t('common.backToProjects') }}</span>
        </NuxtLink>
      </div>

      <!-- Project Header -->
      <div class="space-y-6 border-b border-white/10 pb-8">
        <div class="flex flex-wrap items-center gap-3">
          <span
            class="px-2.5 py-1 rounded text-xs font-mono border"
            :class="statusClasses"
          >
            {{ project.statusLabel[locale as 'ru' | 'en'] }}
          </span>
          <span
            v-if="liveVersion"
            class="px-2.5 py-1 rounded text-xs font-mono bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {{ liveVersion }}
          </span>
          <span class="px-2.5 py-1 rounded text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            {{ project.license }}
          </span>
        </div>

        <div class="space-y-2">
          <h1 class="text-3xl sm:text-5xl font-bold font-mono text-white">
            {{ project.name }}
          </h1>
          <p class="text-lg text-sky-400 font-mono">
            {{ project.role[locale as 'ru' | 'en'] }}
          </p>
        </div>

        <p class="text-base text-zinc-300 leading-relaxed font-sans max-w-3xl">
          {{ project.summary[locale as 'ru' | 'en'] }}
        </p>

        <!-- Action Links -->
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <a
            v-if="project.links.website"
            :href="project.links.website"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-colors"
          >
            <UIcon
              name="i-lucide-globe"
              class="w-4 h-4"
            />
            <span>{{ t('projectDetail.visitWebsite') }}</span>
          </a>

          <a
            v-if="project.links.github"
            :href="project.links.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/5 text-white font-mono text-xs font-medium hover:bg-white/10 transition-colors"
          >
            <UIcon
              name="i-simple-icons-github"
              class="w-4 h-4"
            />
            <span>{{ t('projectDetail.viewRepo') }}</span>
          </a>
        </div>
      </div>

      <!-- Description & Context -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold font-mono text-white uppercase tracking-wider">
          {{ t('projectDetail.overview') }}
        </h2>
        <div class="space-y-4 text-sm text-zinc-300 leading-relaxed font-sans">
          <p
            v-for="(paragraph, idx) in project.fullDescription[locale as 'ru' | 'en']"
            :key="idx"
          >
            {{ paragraph }}
          </p>
        </div>
      </section>

      <!-- Architecture Section -->
      <section class="rounded-xl border border-white/10 bg-[#0d0f17] p-6 sm:p-8 space-y-4">
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 font-mono text-xs uppercase tracking-wider">
          {{ t('projectDetail.architecture') }}
        </div>
        <p class="text-sm text-zinc-300 leading-relaxed font-sans">
          {{ project.architecture[locale as 'ru' | 'en'] }}
        </p>

        <!-- CLI invocation example if available -->
        <div
          v-if="project.commandExample"
          class="pt-4 border-t border-white/10"
        >
          <div class="text-xs font-mono text-zinc-400 mb-2">
            {{ t('projectDetail.quickStart') }}:
          </div>
          <pre class="p-4 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-sky-300 overflow-x-auto select-all"><code>{{ project.commandExample }}</code></pre>
        </div>
      </section>

      <!-- Features / Capabilities (Implemented vs Planned) -->
      <section class="space-y-6">
        <h2 class="text-xl font-bold font-mono text-white uppercase tracking-wider">
          {{ t('projectDetail.capabilities') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(feature, idx) in project.features"
            :key="idx"
            class="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/5"
          >
            <div class="mt-0.5">
              <UIcon
                v-if="feature.implemented"
                name="i-lucide-check-circle-2"
                class="w-4 h-4 text-emerald-400"
              />
              <UIcon
                v-else
                name="i-lucide-clock"
                class="w-4 h-4 text-amber-400"
              />
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold font-mono text-white">
                  {{ feature.title[locale as 'ru' | 'en'] }}
                </span>
                <span
                  class="text-[9px] font-mono px-1.5 py-0.5 rounded border"
                  :class="feature.implemented ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'"
                >
                  {{ feature.implemented ? t('common.implemented') : t('common.inProgress') }}
                </span>
              </div>
              <p class="text-xs text-zinc-400 font-sans">
                {{ feature.description[locale as 'ru' | 'en'] }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tech tags -->
      <section class="pt-6 border-t border-white/10 space-y-3">
        <div class="text-xs font-mono text-zinc-400">
          {{ locale === 'ru' ? 'Технологии и примитивы:' : 'Technologies & Primitives:' }}
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="text-xs font-mono px-3 py-1 rounded bg-white/5 border border-white/10 text-zinc-300"
          >
            {{ tech }}
          </span>
        </div>
      </section>
    </div>

    <!-- Fallback if project not found -->
    <div
      v-else
      class="max-w-3xl mx-auto px-4 py-24 text-center space-y-6"
    >
      <div class="text-4xl font-mono font-bold text-red-400">
        404
      </div>
      <h1 class="text-2xl font-mono text-white">
        {{ locale === 'ru' ? 'Проект не найден' : 'Project Not Found' }}
      </h1>
      <p class="text-sm text-zinc-400 font-mono">
        {{ locale === 'ru' ? 'Запрошенный идентификатор проекта отсутствует в реестре.' : 'The requested project slug was not located in the registry.' }}
      </p>
      <div>
        <NuxtLink
          :to="localePath('/projects')"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-mono text-xs font-bold"
        >
          <span>{{ t('common.backToProjects') }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
