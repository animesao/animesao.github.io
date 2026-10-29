<script setup lang="ts">
import { getConfirmedPublicLinks } from '~/data/links'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const confirmedLinks = computed(() => getConfirmedPublicLinks(locale.value as 'ru' | 'en'))
const currentYear = new Date().getFullYear()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="border-t border-white/[0.08] bg-[#090a0d] py-12 text-zinc-400 font-sans">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/[0.08]">
        <!-- Brand column -->
        <div class="space-y-3">
          <AppLogo />
          <p class="text-xs text-zinc-400 leading-relaxed font-mono">
            {{ locale === 'ru'
              ? 'Независимый разработчик программного обеспечения. Системные рантаймы, веб-технологии и AI-assisted development.'
              : 'Independent software developer. Systems runtimes, modern web architecture, and AI-assisted engineering.'
            }}
          </p>
          <div class="text-[11px] font-mono text-zinc-500">
            LOC: RU / EN · SSG DEPLOYMENT · Nuxt 4
          </div>
        </div>

        <!-- Ecosystem & Navigation -->
        <div class="space-y-3">
          <h2 class="text-xs font-mono font-semibold text-white uppercase tracking-wider">
            {{ locale === 'ru' ? 'Навигация' : 'Navigation' }}
          </h2>
          <ul class="space-y-2 text-xs font-mono">
            <li>
              <NuxtLink
                :to="localePath('/')"
                class="hover:text-white transition-colors"
              >
                {{ t('nav.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/about')"
                class="hover:text-white transition-colors"
              >
                {{ t('nav.about') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/projects')"
                class="hover:text-white transition-colors"
              >
                {{ t('nav.projects') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/stack')"
                class="hover:text-white transition-colors"
              >
                {{ t('nav.stack') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/notes')"
                class="hover:text-white transition-colors"
              >
                {{ t('nav.notes') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Verified Links -->
        <div class="space-y-3">
          <h2 class="text-xs font-mono font-semibold text-white uppercase tracking-wider">
            {{ locale === 'ru' ? 'Подтверждённые ссылки' : 'Verified Links' }}
          </h2>
          <ul class="space-y-2 text-xs font-mono">
            <li
              v-for="link in confirmedLinks"
              :key="link.id"
            >
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <UIcon
                  :name="link.icon"
                  class="w-3.5 h-3.5 text-zinc-400"
                />
                <span>{{ link.label[locale as 'ru' | 'en'] }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div class="flex items-center gap-3 text-zinc-500">
          <span>© {{ currentYear }} animesao</span>
          <span>·</span>
          <span>MIT License</span>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-[#12141a] hover:bg-[#181b24] text-zinc-400 hover:text-white transition-colors text-xs card-sheen cursor-pointer"
          @click="scrollToTop"
        >
          <span>{{ locale === 'ru' ? 'Наверх' : 'Back to top' }}</span>
          <UIcon
            name="i-lucide-arrow-up"
            class="w-3.5 h-3.5"
          />
        </button>
      </div>
    </div>
  </footer>
</template>
