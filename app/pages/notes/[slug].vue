<script setup lang="ts">
import { ref, computed } from 'vue'
import { notesData } from '~/data/notes'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => route.params.slug as string)
const note = computed(() => notesData.find(n => n.slug === slug.value))

const copiedSnippet = ref<string | null>(null)
const copiedArticleLink = ref(false)

async function copyCode(codeText: string, id: string) {
  try {
    await navigator.clipboard.writeText(codeText)
    copiedSnippet.value = id
    setTimeout(() => {
      copiedSnippet.value = null
    }, 2000)
  } catch {
    copiedSnippet.value = null
  }
}

async function copyLink() {
  try {
    if (typeof window !== 'undefined') {
      await navigator.clipboard.writeText(window.location.href)
      copiedArticleLink.value = true
      setTimeout(() => {
        copiedArticleLink.value = false
      }, 2000)
    }
  } catch {
    copiedArticleLink.value = false
  }
}

useSeoMeta({
  title: () => note.value
    ? `${note.value.title[locale.value as 'ru' | 'en']} · animesao`
    : 'Заметка не найдена · animesao',
  description: () => note.value
    ? note.value.summary[locale.value as 'ru' | 'en']
    : 'Запрошенная статья не найдена',
  ogTitle: () => note.value ? note.value.title[locale.value as 'ru' | 'en'] : 'animesao',
  ogDescription: () => note.value ? note.value.summary[locale.value as 'ru' | 'en'] : ''
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 animate-reveal">
    <div
      v-if="note"
      class="space-y-10"
    >
      <!-- Navigation Back & Share -->
      <div class="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <NuxtLink
          :to="localePath('/notes')"
          class="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group cursor-pointer"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1.5"
          />
          <span>{{ locale === 'ru' ? 'Назад ко всем заметкам' : 'Back to all notes' }}</span>
        </NuxtLink>

        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-[#14161f] text-zinc-400 hover:text-white text-xs font-mono transition-all duration-200 card-sheen cursor-pointer interactive-tap"
          @click="copyLink"
        >
          <UIcon
            :name="copiedArticleLink ? 'i-lucide-check' : 'i-lucide-share-2'"
            class="w-3.5 h-3.5 transition-transform duration-200"
            :class="copiedArticleLink ? 'text-emerald-400 scale-125' : ''"
          />
          <span>{{ copiedArticleLink ? (locale === 'ru' ? 'Ссылка скопирована' : 'Link copied') : (locale === 'ru' ? 'Поделиться' : 'Share') }}</span>
        </button>
      </div>

      <!-- Article Header -->
      <header class="space-y-6">
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="px-2.5 py-0.5 rounded text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/25 card-sheen font-medium">
            {{ note.category[locale as 'ru' | 'en'] }}
          </span>
          <span class="px-2.5 py-0.5 rounded text-xs font-mono bg-[#1b1e2a] text-zinc-400 border border-white/[0.06] flex items-center gap-1.5">
            <UIcon
              name="i-lucide-clock"
              class="w-3 h-3 text-zinc-400"
            />
            {{ note.readTime[locale as 'ru' | 'en'] }}
          </span>
          <time
            :datetime="note.date"
            class="px-2.5 py-0.5 rounded text-xs font-mono bg-[#1b1e2a] text-zinc-400 border border-white/[0.06] flex items-center gap-1.5"
          >
            <UIcon
              name="i-lucide-calendar"
              class="w-3 h-3 text-zinc-400"
            />
            {{ note.date }}
          </time>
        </div>

        <h1 class="text-3xl sm:text-5xl font-bold font-mono text-white leading-tight">
          {{ note.title[locale as 'ru' | 'en'] }}
        </h1>

        <p class="text-base sm:text-lg text-amber-200/90 leading-relaxed font-sans border-l-2 border-amber-400 pl-4 py-1">
          {{ note.summary[locale as 'ru' | 'en'] }}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap items-center gap-2 pt-2">
          <span
            v-for="tag in note.tags"
            :key="tag"
            class="px-2.5 py-1 rounded-md text-xs font-mono bg-[#14161f] text-zinc-400 border border-white/[0.08]"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <!-- Key Takeaways Callout -->
      <section
        v-if="note.takeaways"
        class="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-6 card-sheen space-y-3"
      >
        <div class="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
          <UIcon
            name="i-lucide-check-circle"
            class="w-4 h-4"
          />
          <span>{{ locale === 'ru' ? 'Ключевые выводы архитектуры' : 'Key Architectural Takeaways' }}</span>
        </div>
        <ul class="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
          <li
            v-for="(takeaway, idx) in note.takeaways[locale as 'ru' | 'en']"
            :key="idx"
            class="flex items-start gap-2.5"
          >
            <span class="text-amber-400 font-mono text-xs mt-1">▸</span>
            <span class="leading-relaxed">{{ takeaway }}</span>
          </li>
        </ul>
      </section>

      <!-- Article Content Sections -->
      <div class="space-y-10 pt-4 text-zinc-200 font-sans leading-relaxed text-sm sm:text-base">
        <section
          v-for="(section, sIdx) in note.sections"
          :key="sIdx"
          class="space-y-4"
        >
          <h2
            v-if="section.title"
            class="text-xl sm:text-2xl font-bold font-mono text-white pt-4 border-t border-white/[0.06]"
          >
            {{ section.title[locale as 'ru' | 'en'] }}
          </h2>

          <p class="leading-relaxed text-zinc-300">
            {{ section.content[locale as 'ru' | 'en'] }}
          </p>

          <!-- Code Snippet -->
          <div
            v-if="section.code"
            class="space-y-2"
          >
            <div
              v-if="section.code.caption"
              class="text-xs font-mono text-zinc-400 flex items-center gap-2"
            >
              <UIcon
                name="i-lucide-terminal"
                class="w-3.5 h-3.5 text-amber-400"
              />
              <span>{{ section.code.caption }}</span>
            </div>

            <div class="rounded-xl border border-white/[0.08] bg-[#0d0e12] overflow-hidden shadow-2xl relative">
              <div class="flex items-center justify-between px-4 py-2 bg-[#12141a] border-b border-white/[0.06] text-xs font-mono text-zinc-400">
                <span>{{ section.code.language }}</span>
                <button
                  type="button"
                  class="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-all duration-150 cursor-pointer interactive-tap"
                  @click="copyCode(section.code.snippet, `${sIdx}`)"
                >
                  <UIcon
                    :name="copiedSnippet === `${sIdx}` ? 'i-lucide-check' : 'i-lucide-copy'"
                    class="w-3.5 h-3.5 transition-transform duration-200"
                    :class="copiedSnippet === `${sIdx}` ? 'text-emerald-400 scale-125' : ''"
                  />
                  <span>{{ copiedSnippet === `${sIdx}` ? (locale === 'ru' ? 'Скопировано' : 'Copied') : (locale === 'ru' ? 'Копировать' : 'Copy') }}</span>
                </button>
              </div>
              <pre class="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed font-normal"><code>{{ section.code.snippet }}</code></pre>
            </div>
          </div>

          <!-- Section Callout Alert -->
          <div
            v-if="section.callout"
            class="rounded-xl border border-white/[0.1] bg-[#14161f] p-4 text-xs sm:text-sm font-mono text-amber-300/90 flex items-start gap-3 card-sheen"
          >
            <UIcon
              name="i-lucide-shield-alert"
              class="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
            />
            <span class="leading-relaxed">{{ section.callout[locale as 'ru' | 'en'] }}</span>
          </div>
        </section>
      </div>

      <!-- Footer Navigation / Related Links -->
      <footer class="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <NuxtLink
          :to="localePath('/notes')"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.1] bg-[#14161f] text-white font-mono text-xs font-semibold hover:bg-[#1b1e2a] hover:border-amber-500/40 transition-colors card-sheen cursor-pointer"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="w-3.5 h-3.5"
          />
          <span>{{ locale === 'ru' ? 'Вернуться к списку статей' : 'Return to all notes' }}</span>
        </NuxtLink>

        <NuxtLink
          :to="localePath('/projects/cardinal-panel')"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-black font-mono text-xs font-bold hover:bg-amber-300 transition-colors cursor-pointer shadow-md shadow-amber-500/20"
        >
          <span>{{ locale === 'ru' ? 'Смотреть Cardinal Panel' : 'Explore Cardinal Panel' }}</span>
          <UIcon
            name="i-lucide-arrow-right"
            class="w-3.5 h-3.5"
          />
        </NuxtLink>
      </footer>
    </div>

    <!-- Not Found State -->
    <div
      v-else
      class="text-center py-20 space-y-6"
    >
      <div class="inline-flex p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
        <UIcon
          name="i-lucide-alert-triangle"
          class="w-8 h-8"
        />
      </div>
      <h1 class="text-2xl font-bold font-mono text-white">
        {{ locale === 'ru' ? 'Статья не найдена' : 'Article not found' }}
      </h1>
      <NuxtLink
        :to="localePath('/notes')"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-black font-mono text-xs font-bold"
      >
        <span>{{ locale === 'ru' ? 'Вернуться к заметкам' : 'Back to notes' }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
