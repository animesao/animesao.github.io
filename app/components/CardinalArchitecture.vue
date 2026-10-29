<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="rounded-xl border border-white/10 bg-[#0d0f17] p-6 sm:p-8 relative overflow-hidden">
    <!-- Sci-fi ambient detail -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

    <!-- Top Badge & Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
      <div>
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs tracking-wider uppercase mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          {{ t('cardinalSection.eyebrow') }}
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          {{ t('cardinalSection.title') }}
        </h2>
      </div>

      <div class="flex items-center gap-2">
        <a
          href="https://cardinal.work.gd/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white text-black font-mono text-xs font-semibold hover:bg-zinc-200 transition-colors"
        >
          <UIcon
            name="i-lucide-globe"
            class="w-3.5 h-3.5"
          />
          <span>cardinal.work.gd</span>
        </a>
        <a
          href="https://github.com/animesao/cardinal"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-white/15 bg-white/5 text-white font-mono text-xs hover:bg-white/10 transition-colors"
        >
          <UIcon
            name="i-simple-icons-github"
            class="w-3.5 h-3.5"
          />
          <span>GitHub</span>
        </a>
      </div>
    </div>

    <!-- Core Philosophy Callout -->
    <div class="my-6 p-4 rounded-lg bg-black/40 border border-white/5 font-mono text-center">
      <span class="text-xs text-zinc-500 uppercase tracking-widest block mb-1">
        {{ locale === 'ru' ? 'Инженерная философия' : 'Engineering Principle' }}
      </span>
      <p class="text-base sm:text-lg font-bold text-sky-300">
        "No daemon. No Docker. Just containers."
      </p>
    </div>

    <!-- Architecture Grid / Components Diagram -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
      <!-- 1. Cardinal Runtime -->
      <div class="flex flex-col rounded-lg border border-white/10 bg-[#121520] p-5 hover:border-sky-500/40 transition-colors">
        <div class="flex items-center justify-between mb-3">
          <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            Core Runtime
          </span>
          <span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            v2.4.x Live
          </span>
        </div>
        <h3 class="text-lg font-bold text-white font-mono mb-2">
          Cardinal
        </h3>
        <p class="text-xs text-zinc-300 leading-relaxed flex-1">
          {{ t('cardinalSection.runtimeDesc') }}
        </p>
        <div class="pt-4 mt-4 border-t border-white/10 space-y-2">
          <div class="text-[11px] font-mono text-zinc-400">
            <span class="text-zinc-500">Stack:</span> Go · cgroups v2 · Namespaces · OverlayFS
          </div>
          <NuxtLink
            :to="localePath('/projects/cardinal')"
            class="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 font-semibold"
          >
            <span>{{ t('common.readMore') }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="w-3.5 h-3.5"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- 2. Cardinal Wings -->
      <div class="flex flex-col rounded-lg border border-white/10 bg-[#121520] p-5 hover:border-emerald-500/40 transition-colors">
        <div class="flex items-center justify-between mb-3">
          <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            API Daemon
          </span>
          <span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            v1 Live
          </span>
        </div>
        <h3 class="text-lg font-bold text-white font-mono mb-2">
          Cardinal Wings
        </h3>
        <p class="text-xs text-zinc-300 leading-relaxed flex-1">
          {{ t('cardinalSection.wingsDesc') }}
        </p>
        <div class="pt-4 mt-4 border-t border-white/10 space-y-2">
          <div class="text-[11px] font-mono text-zinc-400">
            <span class="text-zinc-500">Stack:</span> Go · REST · SSE · SFTP · Bearer RBAC
          </div>
          <NuxtLink
            :to="localePath('/projects/cardinal-wings')"
            class="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            <span>{{ t('common.readMore') }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="w-3.5 h-3.5"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- 3. @cardinal-panel -->
      <div class="flex flex-col rounded-lg border border-dashed border-white/15 bg-[#121520]/80 p-5 hover:border-zinc-400 transition-colors">
        <div class="flex items-center justify-between mb-3">
          <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
            Control Plane
          </span>
          <span class="text-[11px] font-mono text-amber-400 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {{ locale === 'ru' ? 'В проектировании' : 'In Design' }}
          </span>
        </div>
        <h3 class="text-lg font-bold text-white font-mono mb-2">
          @cardinal-panel
        </h3>
        <p class="text-xs text-zinc-400 leading-relaxed flex-1">
          {{ t('cardinalSection.panelDesc') }}
        </p>
        <div class="pt-4 mt-4 border-t border-white/10 space-y-2">
          <div class="text-[11px] font-mono text-zinc-400">
            <span class="text-zinc-500">Stack:</span> PHP · Laravel · OpenAPI client
          </div>
          <NuxtLink
            :to="localePath('/projects/cardinal-panel')"
            class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white font-semibold"
          >
            <span>{{ t('common.readMore') }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="w-3.5 h-3.5"
            />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Bottom link to full Cardinal architecture -->
    <div class="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
      <span class="text-zinc-400">
        {{ locale === 'ru' ? 'Все компоненты экосистемы спроектированы как единая модульная система.' : 'All ecosystem components are engineered as a cohesive modular system.' }}
      </span>
      <NuxtLink
        :to="localePath('/projects/cardinal')"
        class="inline-flex items-center gap-1.5 text-white hover:text-sky-400 font-semibold transition-colors"
      >
        <span>{{ t('cardinalSection.viewDetails') }}</span>
        <UIcon
          name="i-lucide-arrow-right"
          class="w-3.5 h-3.5"
        />
      </NuxtLink>
    </div>
  </div>
</template>
