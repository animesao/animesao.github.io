<script setup lang="ts">
import { useProjectVersions } from '~/composables/useProjectVersions'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const { getVersion } = useProjectVersions()
</script>

<template>
  <div class="rounded-2xl border border-white/[0.08] bg-[#14161f] card-sheen p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-black/40">
    <!-- Ambient subtle amber & emerald background lighting -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

    <!-- Top Badge & Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
      <div>
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-xs tracking-wider uppercase mb-2 card-sheen">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {{ t('cardinalSection.eyebrow') }}
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          {{ t('cardinalSection.title') }}
        </h2>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <a
          href="https://dsc.gg/cardinal-organization"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/30 text-[#99a2fe] hover:text-white hover:bg-[#5865F2]/25 font-mono text-xs font-semibold transition-all duration-150 shadow-md shadow-black/30 hover:-translate-y-0.5 cursor-pointer card-sheen"
        >
          <UIcon
            name="i-simple-icons-discord"
            class="w-3.5 h-3.5 text-[#5865F2]"
          />
          <span>Discord</span>
        </a>
        <a
          href="https://github.com/cardinal-organization"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 font-mono text-xs font-semibold hover:bg-amber-500/20 transition-all duration-150 shadow-md shadow-black/30 hover:-translate-y-0.5 cursor-pointer card-sheen"
        >
          <UIcon
            name="i-simple-icons-github"
            class="w-3.5 h-3.5 text-amber-400"
          />
          <span>cardinal-organization</span>
        </a>
        <a
          href="https://github.com/animesao/cardinal"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 text-black font-mono text-xs font-bold hover:bg-white transition-all duration-150 shadow-md shadow-black/30 hover:-translate-y-0.5 cursor-pointer"
        >
          <UIcon
            name="i-simple-icons-github"
            class="w-3.5 h-3.5"
          />
          <span>animesao/cardinal</span>
        </a>
      </div>
    </div>

    <!-- Core Philosophy Callout -->
    <div class="my-6 p-4 rounded-xl bg-[#0a0b0f] border border-white/[0.06] card-sheen font-mono text-center">
      <span class="text-xs text-zinc-500 uppercase tracking-widest block mb-1">
        {{ locale === 'ru' ? 'Инженерная философия' : 'Engineering Principle' }}
      </span>
      <p class="text-base sm:text-lg font-bold text-amber-400">
        "No daemon. No Docker. Just containers."
      </p>
    </div>

    <!-- Live Animated Data Flow Diagram (Browser -> Panel -> Wings -> Cardinal) -->
    <div class="hidden lg:flex items-center justify-between px-6 py-3.5 mb-6 rounded-xl bg-[#0a0b0f] border border-white/[0.08] text-zinc-400 font-mono text-xs card-sheen">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span class="text-zinc-200 font-semibold">Browser UI</span>
      </div>
      <div class="flex-1 max-w-[130px] mx-3 flex flex-col items-center">
        <span class="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">HTTPS / WSS</span>
        <svg
          class="w-full h-2 text-cyan-400/70"
          viewBox="0 0 100 8"
          fill="none"
        >
          <line
            x1="0"
            y1="4"
            x2="100"
            y2="4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-dasharray="4 4"
            class="animate-flow-dash"
          />
        </svg>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span class="text-amber-300 font-semibold">Cardinal Panel</span>
        <span class="text-[10px] text-zinc-500">:3000</span>
      </div>
      <div class="flex-1 max-w-[130px] mx-3 flex flex-col items-center">
        <span class="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">REST / SSE</span>
        <svg
          class="w-full h-2 text-amber-400/70"
          viewBox="0 0 100 8"
          fill="none"
        >
          <line
            x1="0"
            y1="4"
            x2="100"
            y2="4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-dasharray="4 4"
            class="animate-flow-dash"
          />
        </svg>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span class="text-emerald-300 font-semibold">Cardinal Wings</span>
        <span class="text-[10px] text-zinc-500">:8080</span>
      </div>
      <div class="flex-1 max-w-[130px] mx-3 flex flex-col items-center">
        <span class="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">UNIX / CLI</span>
        <svg
          class="w-full h-2 text-emerald-400/70"
          viewBox="0 0 100 8"
          fill="none"
        >
          <line
            x1="0"
            y1="4"
            x2="100"
            y2="4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-dasharray="4 4"
            class="animate-flow-dash"
          />
        </svg>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
        <span class="text-rose-300 font-semibold">Cardinal Runtime</span>
      </div>
    </div>

    <!-- Architecture Grid / Components Diagram -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
      <!-- 1. Cardinal Runtime -->
      <article class="flex flex-col rounded-xl border border-white/[0.08] bg-[#1a1d28] card-sheen p-5 hover:border-amber-500/50 hover:bg-[#1e2230] transition-all duration-200 hover:-translate-y-0.5 group">
        <header class="flex items-center justify-between mb-3">
          <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 card-sheen">
            Core Runtime
          </span>
          <span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {{ getVersion('cardinal') }}
          </span>
        </header>

        <h3 class="text-lg font-bold text-white font-mono mb-2 group-hover:text-amber-300 transition-colors">
          Cardinal
        </h3>

        <p class="text-xs text-zinc-300 leading-relaxed flex-1">
          {{ t('cardinalSection.runtimeDesc') }}
        </p>

        <footer class="pt-4 mt-4 border-t border-white/[0.08] space-y-2.5">
          <div class="text-[11px] font-mono text-zinc-400">
            <span class="text-zinc-500">Stack:</span> Go · cgroups v2 · Namespaces · OverlayFS
          </div>
          <div class="flex items-center justify-between">
            <NuxtLink
              :to="localePath('/projects/cardinal')"
              class="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 font-semibold"
            >
              <span>{{ t('common.readMore') }}</span>
              <UIcon
                name="i-lucide-arrow-right"
                class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </NuxtLink>
            <a
              href="https://github.com/animesao/cardinal"
              target="_blank"
              rel="noopener noreferrer"
              class="text-zinc-400 hover:text-white transition-colors"
              aria-label="Cardinal GitHub"
            >
              <UIcon
                name="i-simple-icons-github"
                class="w-3.5 h-3.5"
              />
            </a>
          </div>
        </footer>
      </article>

      <!-- 2. Cardinal Wings -->
      <article class="flex flex-col rounded-xl border border-white/[0.08] bg-[#1a1d28] card-sheen p-5 hover:border-emerald-500/50 hover:bg-[#1e2230] transition-all duration-200 hover:-translate-y-0.5 group">
        <header class="flex items-center justify-between mb-3">
          <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 card-sheen">
            API Daemon
          </span>
          <span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {{ getVersion('cardinal-wings') }}
          </span>
        </header>

        <h3 class="text-lg font-bold text-white font-mono mb-2 group-hover:text-emerald-300 transition-colors">
          Cardinal Wings
        </h3>

        <p class="text-xs text-zinc-300 leading-relaxed flex-1">
          {{ t('cardinalSection.wingsDesc') }}
        </p>

        <footer class="pt-4 mt-4 border-t border-white/[0.08] space-y-2.5">
          <div class="text-[11px] font-mono text-zinc-400">
            <span class="text-zinc-500">Stack:</span> Go · REST · SSE · SFTP · Bearer RBAC
          </div>
          <div class="flex items-center justify-between">
            <NuxtLink
              :to="localePath('/projects/cardinal-wings')"
              class="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <span>{{ t('common.readMore') }}</span>
              <UIcon
                name="i-lucide-arrow-right"
                class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </NuxtLink>
            <a
              href="https://github.com/animesao/cardinal-wings"
              target="_blank"
              rel="noopener noreferrer"
              class="text-zinc-400 hover:text-white transition-colors"
              aria-label="Cardinal Wings GitHub"
            >
              <UIcon
                name="i-simple-icons-github"
                class="w-3.5 h-3.5"
              />
            </a>
          </div>
        </footer>
      </article>

      <!-- 3. Cardinal Panel -->
      <article class="flex flex-col rounded-xl border border-white/[0.08] bg-[#1a1d28] card-sheen p-5 hover:border-amber-500/50 hover:bg-[#1e2230] transition-all duration-200 hover:-translate-y-0.5 group">
        <header class="flex items-center justify-between mb-3">
          <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 card-sheen">
            Control Plane
          </span>
          <span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {{ getVersion('cardinal-panel') }}
          </span>
        </header>

        <h3 class="text-lg font-bold text-white font-mono mb-2 group-hover:text-amber-300 transition-colors">
          Cardinal Panel
        </h3>

        <p class="text-xs text-zinc-300 leading-relaxed flex-1">
          {{ t('cardinalSection.panelDesc') }}
        </p>

        <footer class="pt-4 mt-4 border-t border-white/[0.08] space-y-2.5">
          <div class="text-[11px] font-mono text-zinc-400">
            <span class="text-zinc-500">Stack:</span> Nuxt 4 · Drizzle ORM · WebSocket · Monaco
          </div>
          <div class="flex items-center justify-between">
            <NuxtLink
              :to="localePath('/projects/cardinal-panel')"
              class="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 font-semibold"
            >
              <span>{{ t('common.readMore') }}</span>
              <UIcon
                name="i-lucide-arrow-right"
                class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </NuxtLink>
            <a
              href="https://github.com/animesao/cardinal-panel"
              target="_blank"
              rel="noopener noreferrer"
              class="text-zinc-400 hover:text-white transition-colors"
              aria-label="Cardinal Panel GitHub"
            >
              <UIcon
                name="i-simple-icons-github"
                class="w-3.5 h-3.5"
              />
            </a>
          </div>
        </footer>
      </article>

      <!-- 4. Cardinal Blueprints -->
      <article class="flex flex-col rounded-xl border border-white/[0.08] bg-[#1a1d28] card-sheen p-5 hover:border-amber-500/50 hover:bg-[#1e2230] transition-all duration-200 hover:-translate-y-0.5 group">
        <header class="flex items-center justify-between mb-3">
          <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 card-sheen">
            Blueprints
          </span>
          <span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {{ getVersion('cardinal-blueprints') }}
          </span>
        </header>

        <h3 class="text-lg font-bold text-white font-mono mb-2 group-hover:text-amber-300 transition-colors">
          {{ t('cardinalSection.blueprintsTitle') }}
        </h3>

        <p class="text-xs text-zinc-300 leading-relaxed flex-1">
          {{ t('cardinalSection.blueprintsDesc') }}
        </p>

        <footer class="pt-4 mt-4 border-t border-white/[0.08] space-y-2.5">
          <div class="text-[11px] font-mono text-zinc-400">
            <span class="text-zinc-500">Stack:</span> JSON · 27 Templates · OCI · Registry
          </div>
          <div class="flex items-center justify-between">
            <NuxtLink
              :to="localePath('/projects/cardinal-blueprints')"
              class="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 font-semibold"
            >
              <span>{{ t('common.readMore') }}</span>
              <UIcon
                name="i-lucide-arrow-right"
                class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </NuxtLink>
            <a
              href="https://github.com/cardinal-organization/cardinal-blueprints"
              target="_blank"
              rel="noopener noreferrer"
              class="text-zinc-400 hover:text-white transition-colors"
              aria-label="Cardinal Blueprints GitHub"
            >
              <UIcon
                name="i-simple-icons-github"
                class="w-3.5 h-3.5"
              />
            </a>
          </div>
        </footer>
      </article>
    </div>

    <!-- Bottom link to full Cardinal architecture -->
    <div class="mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
      <span class="text-zinc-400">
        {{ locale === 'ru' ? 'Вся экосистема: автономный рантайм на Go, REST API демон управления, веб-панель на Nuxt 4 и реестр шаблонов контейнеров.' : 'The complete ecosystem: daemonless Go runtime, REST API daemon, Nuxt 4 web panel, and curated blueprints registry.' }}
      </span>
      <NuxtLink
        :to="localePath('/projects/cardinal')"
        class="inline-flex items-center gap-1.5 text-white hover:text-amber-400 font-semibold transition-colors group"
      >
        <span>{{ t('cardinalSection.viewDetails') }}</span>
        <UIcon
          name="i-lucide-arrow-right"
          class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
        />
      </NuxtLink>
    </div>
  </div>
</template>
