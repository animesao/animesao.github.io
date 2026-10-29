<script setup lang="ts">
import { ref, computed } from 'vue'
import { projectsData } from '~/data/projects'

const { locale, t } = useI18n()
const selectedFilter = ref<'all' | 'systems' | 'web'>('all')

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'systems') {
    return projectsData.filter(p => p.ecosystemRole === 'core-runtime' || p.ecosystemRole === 'api-daemon')
  }
  if (selectedFilter.value === 'web') {
    return projectsData.filter(p => p.ecosystemRole === 'control-plane')
  }
  return projectsData
})

useSeoMeta({
  title: () => locale.value === 'ru' ? 'Проекты · animesao' : 'Projects · animesao',
  description: () => locale.value === 'ru'
    ? 'Каталог проектов animesao: легковесный daemonless container runtime Cardinal, демон Cardinal Wings и веб-панель Cardinal Panel.'
    : 'Engineering projects by animesao: lightweight daemonless container runtime Cardinal, Cardinal Wings daemon, and Cardinal Panel web dashboard.',
  ogTitle: () => locale.value === 'ru' ? 'Проекты · animesao' : 'Projects · animesao'
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 animate-reveal">
    <!-- Header -->
    <div class="space-y-4 border-b border-white/[0.08] pb-8">
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#14161f] border border-white/[0.08] text-zinc-400 font-mono text-xs uppercase tracking-wider card-sheen">
        {{ locale === 'ru' ? 'ИНЖЕНЕРНЫЕ ПРОЕКТЫ' : 'ENGINEERING REPOSITORY' }}
      </div>
      <h1 class="text-3xl sm:text-5xl font-bold font-mono text-white">
        {{ t('nav.projects') }}
      </h1>
      <p class="text-sm sm:text-base text-zinc-400 font-sans max-w-3xl leading-relaxed">
        {{ locale === 'ru'
          ? 'Флагманские и инфраструктурные проекты с открытым исходным кодом. Каждый проект представлен со своим действительным статусом, версиями из репозиториев и архитектурными деталями.'
          : 'Flagship open-source projects and developer tools. Every project is documented with its verified lifecycle status, repository releases, and architectural role.'
        }}
      </p>

      <!-- Category Filter Tabs -->
      <div class="flex flex-wrap items-center gap-2 pt-4">
        <button
          type="button"
          class="px-4 py-2 rounded-xl font-mono text-xs transition-all duration-150 cursor-pointer"
          :class="selectedFilter === 'all'
            ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-500/20'
            : 'bg-[#14161f] text-zinc-400 hover:text-white border border-white/[0.08] hover:bg-[#1a1d28] card-sheen'"
          @click="selectedFilter = 'all'"
        >
          {{ locale === 'ru' ? 'Все проекты' : 'All Projects' }} ({{ projectsData.length }})
        </button>

        <button
          type="button"
          class="px-4 py-2 rounded-xl font-mono text-xs transition-all duration-150 cursor-pointer"
          :class="selectedFilter === 'systems'
            ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-500/20'
            : 'bg-[#14161f] text-zinc-400 hover:text-white border border-white/[0.08] hover:bg-[#1a1d28] card-sheen'"
          @click="selectedFilter = 'systems'"
        >
          {{ locale === 'ru' ? 'Системный рантайм (Go)' : 'Systems Runtime (Go)' }}
        </button>

        <button
          type="button"
          class="px-4 py-2 rounded-xl font-mono text-xs transition-all duration-150 cursor-pointer"
          :class="selectedFilter === 'web'
            ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-500/20'
            : 'bg-[#14161f] text-zinc-400 hover:text-white border border-white/[0.08] hover:bg-[#1a1d28] card-sheen'"
          @click="selectedFilter = 'web'"
        >
          {{ locale === 'ru' ? 'Веб-панель (Nuxt 4)' : 'Web Panel (Nuxt 4)' }}
        </button>
      </div>
    </div>

    <!-- Cardinal Ecosystem Highlights (if viewing all) -->
    <div
      v-if="selectedFilter === 'all'"
      class="mb-8"
    >
      <CardinalArchitecture />
    </div>

    <!-- Projects Grid -->
    <div class="space-y-6">
      <h2 class="text-xl font-bold font-mono text-white flex items-center justify-between">
        <span>{{ locale === 'ru' ? 'Каталог репозиториев и спецификаций' : 'Repositories & Specifications' }}</span>
        <span class="text-xs text-zinc-500 font-mono font-normal">
          {{ filteredProjects.length }} {{ locale === 'ru' ? 'проектов' : 'entries' }}
        </span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>
