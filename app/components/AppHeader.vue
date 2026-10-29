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
  <header class="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0d0e12]/85 backdrop-blur-xl card-sheen">
    <!-- Accessibility skip link -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-sm focus:rounded-lg"
    >
      Skip to content
    </a>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink
        :to="localePath('/')"
        class="focus-visible:rounded-lg"
        aria-label="ANIMESAO Home"
      >
        <AppLogo />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav
        class="hidden md:flex items-center gap-1.5 text-sm font-medium"
        aria-label="Main Navigation"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="localePath(item.to)"
          class="px-3.5 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all duration-150 font-mono text-xs tracking-wider uppercase border border-transparent"
          active-class="!text-amber-400 !bg-[#1b1e2a] !border-amber-500/30 card-sheen shadow-sm"
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
          class="p-2 rounded-lg border border-white/[0.08] bg-[#14161f] text-zinc-400 hover:text-white hover:border-amber-500/40 hover:bg-[#1b1e2a] transition-all duration-150 inline-flex items-center justify-center card-sheen"
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
          class="p-2 rounded-lg border border-white/[0.08] bg-[#14161f] text-zinc-300 hover:text-white focus-visible:outline"
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

    <!-- Mobile Navigation Drawer -->
    <Transition name="drawer">
      <div
        v-if="isMobileMenuOpen"
        id="mobile-nav"
        class="md:hidden border-b border-white/[0.08] bg-[#12141d] px-4 py-4 space-y-2"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="localePath(item.to)"
          class="block px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.05] font-mono text-xs uppercase tracking-wider transition-all duration-150 active:scale-[0.98]"
          active-class="!text-amber-400 !bg-[#1b1e2a] border border-amber-500/30"
          @click="closeMenu"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>

        <div class="pt-3 border-t border-white/[0.08] flex items-center justify-between">
          <span class="text-xs font-mono text-zinc-500">github.com/animesao</span>
          <a
            v-if="publicContacts.github"
            :href="publicContacts.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
          >
            <UIcon
              name="i-simple-icons-github"
              class="w-4 h-4"
            />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
