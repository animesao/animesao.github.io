<script setup lang="ts">
import { ref } from 'vue'
import { publicContacts } from '~/data/links'

const { t } = useI18n()
const localePath = useLocalePath()
const isMobileMenuOpen = ref(false)

const navItems = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.about', to: '/about' },
  { labelKey: 'nav.projects', to: '/projects' },
  { labelKey: 'nav.stack', to: '/stack' },
  { labelKey: 'nav.notes', to: '/notes' }
]

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090a0f]/90 backdrop-blur-md">
    <!-- Accessibility skip link -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-sm focus:rounded"
    >
      Skip to content
    </a>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink
        :to="localePath('/')"
        class="focus-visible:rounded"
        aria-label="ANIMESAO Home"
      >
        <AppLogo />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav
        class="hidden md:flex items-center gap-1 text-sm font-medium"
        aria-label="Main Navigation"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="localePath(item.to)"
          class="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/5 transition-colors font-mono text-xs tracking-wider uppercase"
          active-class="!text-white !bg-white/10 border border-white/10"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
      </nav>

      <!-- Desktop Right Actions -->
      <div class="hidden md:flex items-center gap-3">
        <LanguageSwitcher />

        <a
          v-if="publicContacts.github"
          :href="publicContacts.github"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-md border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:border-white/25 transition-colors inline-flex items-center justify-center"
          aria-label="GitHub Profile"
        >
          <UIcon
            name="i-simple-icons-github"
            class="w-4 h-4"
          />
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex items-center gap-2 md:hidden">
        <LanguageSwitcher />

        <button
          type="button"
          class="p-2 rounded-md border border-white/10 bg-white/5 text-zinc-300 hover:text-white focus-visible:outline"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav"
          :aria-label="isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
          @click="toggleMenu"
        >
          <UIcon
            :name="isMobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            class="w-5 h-5"
          />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Navigation -->
    <div
      v-if="isMobileMenuOpen"
      id="mobile-nav"
      class="md:hidden border-b border-white/10 bg-[#090a0f] px-4 pt-3 pb-6 space-y-2 transition-all"
    >
      <nav
        class="flex flex-col space-y-1"
        aria-label="Mobile Navigation"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="localePath(item.to)"
          class="px-3 py-2.5 rounded-md text-sm font-mono tracking-wider text-zinc-300 hover:text-white hover:bg-white/5 transition-colors uppercase"
          active-class="!text-white !bg-white/10 border border-white/10"
          @click="closeMenu"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
      </nav>

      <div class="pt-4 border-t border-white/10 flex items-center justify-between">
        <span class="text-xs font-mono text-zinc-500">ANIMESAO // DEV</span>
        <a
          v-if="publicContacts.github"
          :href="publicContacts.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 bg-white/5 text-xs font-mono text-zinc-300 hover:text-white"
        >
          <UIcon
            name="i-simple-icons-github"
            class="w-3.5 h-3.5"
          />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </header>
</template>
