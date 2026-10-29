<script setup lang="ts">
import { ref, computed } from 'vue'
import { projectsData } from '~/data/projects'

const { locale, t } = useI18n()
const selectedFilter = ref<'all' | 'core' | 'planned'>('all')

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'core') {
    return projectsData.filter(p => p.ecosystemRole === 'core-runtime' || p.ecosystemRole === 'api-daemon')
  }
  if (selectedFilter.value === 'planned') {
    return projectsData.filter(p => p.status === 'planned')
  }
  return projectsData
})

useSeoMeta({
  title: () => locale.value === 'ru' ? 'Проекты · animesao' : 'Projects · animesao',
  description: () => locale.value === 'ru'
    ? 'Каталог проектов animesao: легковесный daemonless container runtime Cardinal, демон Cardinal Wings и сопутствующие инструменты.'
    : 'Engineering projects by animesao: lightweight daemonless container runtime Cardinal, Cardinal Wings daemon, and related developer tools.',
  ogTitle: () => locale.value === 'ru' ? 'Проекты · animesao' : 'Projects · animesao'
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
    <!-- Header -->
    <div class="space-y-4 border-b border-white/10 pb-8">
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-400 font-mono text-xs uppercase tracking-wider">
        {{ locale === 'ru' ? 'ИНЖЕНЕРНЫЕ ПРОЕКТЫ' : 'ENGINEERING REPOSITORY' }}
      </div>
      <h1 class="text-3xl sm:text-5xl font-bold font-mono text-white">
        {{ t('nav.projects') }}
      </h1>
      <p class="text-sm sm:text-base text-zinc-400 font-sans max-w-3xl leading-relaxed">
        {{ locale === 'ru'
          ? 'Флагманские и прикладные проекты с открытым исходным кодом. Каждый проект представлен со своим действительным статусом, подтверждёнными репозиториями и архитектурными деталями.'
          : 'Flagship open-source projects and developer tools. Every project is documented with its verified lifecycle status, repository links, and architectural role.'
        }}
      </p>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 pt-4">
        <button
          type="button"
          class="px-3.5 py-1.5 rounded-md font-mono text-xs transition-colors cursor-pointer"
          :class="selectedFilter === 'all' ? 'bg-white text-black font-semibold' : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'"
          @click="selectedFilter = 'all'"
        >
          {{ locale === 'ru' ? 'Все проекты' : 'All Projects' }} ({{ projectsData.length }})
        </button>

        <button
          type="button"
          class="px-3.5 py-1.5 rounded-md font-mono text-xs transition-colors cursor-pointer"
          :class="selectedFilter === 'core' ? 'bg-white text-black font-semibold' : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'"
          @click="selectedFilter = 'core'"
        >
          {{ locale === 'ru' ? 'Экосистема Cardinal' : 'Cardinal Ecosystem' }}
        </button>

        <button
          type="button"
          class="px-3.5 py-1.5 rounded-md font-mono text-xs transition-colors cursor-pointer"
          :class="selectedFilter === 'planned' ? 'bg-white text-black font-semibold' : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'"
          @click="selectedFilter = 'planned'"
        >
          {{ locale === 'ru' ? 'Запланировано' : 'Planned' }}
        </button>
      </div>
    </div>

    <!-- Cardinal Ecosystem Highlights (if viewing all or core) -->
    <div
      v-if="selectedFilter !== 'planned'"
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
