<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const { locale } = useI18n()

function handleError() {
  clearError({ redirect: locale.value === 'en' ? '/en' : '/' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#0a0b0e] px-4 font-mono text-zinc-100 selection:bg-sky-500/30 selection:text-white relative overflow-hidden animate-reveal">
    <!-- Sci-fi background grid -->
    <div class="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />

    <div class="relative z-10 max-w-lg text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs tracking-wider uppercase card-sheen">
        <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
        <span>HTTP {{ error.statusCode || 404 }} // ROUTE ANOMALY</span>
      </div>

      <h1 class="text-5xl sm:text-7xl font-bold tracking-tight text-white">
        {{ error.statusCode || 404 }}
      </h1>

      <p class="text-sm text-zinc-400 font-sans leading-relaxed">
        {{ locale === 'ru'
          ? 'Запрошенная страница не существует, была перемещена или удалена из адресного пространства.'
          : 'The requested route does not exist or has been shifted in address space.'
        }}
      </p>

      <div class="pt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 text-black font-mono text-xs font-bold hover:bg-white transition-all duration-150 shadow-lg shadow-black/40 hover:-translate-y-0.5 cursor-pointer"
          @click="handleError"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="w-4 h-4"
          />
          <span>{{ locale === 'ru' ? 'Вернуться на главную' : 'Return Home' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
