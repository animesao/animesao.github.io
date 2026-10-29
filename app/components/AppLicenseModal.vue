<script setup lang="ts">
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { useLicenseModal } from '~/composables/useLicenseModal'

const { locale } = useI18n()
const { isOpen, currentLicense, closeLicenseModal, openLicenseModal } = useLicenseModal()

const dialogRef = ref<HTMLDialogElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const copied = ref(false)

const licenses = {
  'MIT': {
    name: 'MIT License',
    spdx: 'MIT',
    badge: 'Permissive',
    summary: {
      ru: 'Простая и разрешительная лицензия с минимальными ограничениями. Разрешает коммерческое и частное использование, модификацию и распространение при условии сохранения оригинального уведомления об авторских правах.',
      en: 'A simple and permissive open-source license with minimal restrictions. Allows commercial and private use, modification, and distribution provided the original copyright notice is preserved.'
    },
    permissions: [
      { ru: 'Коммерческое использование', en: 'Commercial use' },
      { ru: 'Модификация кода', en: 'Modification' },
      { ru: 'Распространение', en: 'Distribution' },
      { ru: 'Частное использование', en: 'Private use' }
    ],
    limitations: [
      { ru: 'Ограничение ответственности', en: 'No liability' },
      { ru: 'Отсутствие гарантий', en: 'No warranty' }
    ],
    conditions: [
      { ru: 'Уведомление об авторских правах и лицензии', en: 'License & copyright notice' }
    ],
    text: `MIT License

Copyright (c) 2026 animesao

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
  },
  'Apache-2.0': {
    name: 'Apache License 2.0',
    spdx: 'Apache-2.0',
    badge: 'Permissive + Patent Grant',
    summary: {
      ru: 'Разрешительная лицензия на программное обеспечение, предоставляющая явные патентные права от участников проекта, право на модификацию и распространение при сохранении авторских прав и пометок об изменениях.',
      en: 'A permissive open-source license that provides explicit user grants of patent rights from contributors, permitting modification and distribution with preservation of copyright and change notices.'
    },
    permissions: [
      { ru: 'Коммерческое использование', en: 'Commercial use' },
      { ru: 'Модификация кода', en: 'Modification' },
      { ru: 'Распространение', en: 'Distribution' },
      { ru: 'Патентные права', en: 'Patent rights grant' }
    ],
    limitations: [
      { ru: 'Использование торговых марок', en: 'Trademark use' },
      { ru: 'Ограничение ответственности', en: 'No liability' },
      { ru: 'Отсутствие гарантий', en: 'No warranty' }
    ],
    conditions: [
      { ru: 'Уведомление об авторских правах', en: 'License and copyright notice' },
      { ru: 'Указание внесённых изменений', en: 'State changes' }
    ],
    text: `                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.
      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      patent license to make, have made, use, offer to sell, sell, import,
      and otherwise transfer the Work.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, provided that You meet the following conditions:
      (a) You must give any other recipients of the Work a copy of this License;
      (b) You must cause any modified files to carry prominent notices stating
          that You changed the files; and
      (c) You must retain all copyright, patent, trademark, and attribution notices.`
  },
  'AGPL-3.0-or-later': {
    name: 'GNU Affero General Public License v3',
    spdx: 'AGPL-3.0-or-later',
    badge: 'Copyleft + Network',
    summary: {
      ru: 'Строгая copyleft-лицензия, требующая открывать исходный код модифицированного ПО не только при бинарном распространении, но и при предоставлении сетевого сервиса (SaaS / API).',
      en: 'A strong copyleft license requiring source code disclosure of modified versions even when interacting with users remotely over computer networks (SaaS / API).'
    },
    permissions: [
      { ru: 'Коммерческое использование', en: 'Commercial use' },
      { ru: 'Модификация кода', en: 'Modification' },
      { ru: 'Распространение', en: 'Distribution' },
      { ru: 'Патентные права', en: 'Patent rights' }
    ],
    limitations: [
      { ru: 'Ограничение ответственности', en: 'No liability' },
      { ru: 'Отсутствие гарантий', en: 'No warranty' }
    ],
    conditions: [
      { ru: 'Раскрытие исходного кода в сети', en: 'Network use is distribution' },
      { ru: 'Сохранение той же лицензии (Copyleft)', en: 'Same license (Copyleft)' }
    ],
    text: `                    GNU AFFERO GENERAL PUBLIC LICENSE
                       Version 3, 19 November 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

                            Preamble

  The GNU Affero General Public License is a free, copyleft license for
software and other kinds of works, specifically designed to ensure
cooperation with the community in the case of network server software.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
our General Public License is intended to guarantee your freedom to share
and change all versions of a program--to make sure it remains free software
for all its users.

  When we speak of free software, we are referring to freedom, not price.
Our General Public Licenses are designed to make sure that you have the
freedom to distribute copies of free software (and charge for them if you
wish), that you receive source code or can get it if you want it, that you
can change the software or use pieces of it in new free programs, and that
you know you can do these things.`
  }
}

const activeLicenseData = computed(() => {
  if (currentLicense.value in licenses) {
    return licenses[currentLicense.value as keyof typeof licenses]
  }
  return licenses.MIT
})

watch(isOpen, async (val) => {
  if (val) {
    await nextTick()
    if (dialogRef.value && !dialogRef.value.open) {
      dialogRef.value.showModal()
      closeButtonRef.value?.focus()
    }
  } else {
    if (dialogRef.value && dialogRef.value.open) {
      dialogRef.value.close()
    }
  }
})

function onDialogClose() {
  closeLicenseModal()
}

function onBackdropClick(event: MouseEvent) {
  if (event.target === dialogRef.value) {
    closeLicenseModal()
  }
}

async function copyLicenseText() {
  try {
    await navigator.clipboard.writeText(activeLicenseData.value.text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    copied.value = false
  }
}

onMounted(() => {
  if (dialogRef.value) {
    dialogRef.value.addEventListener('close', onDialogClose)
  }
})
</script>

<template>
  <dialog
    ref="dialogRef"
    aria-labelledby="license-dialog-title"
    class="m-auto border border-white/[0.12] bg-[#10121a] text-zinc-100 rounded-2xl shadow-2xl shadow-black/80 p-0 max-w-2xl w-[92vw] overflow-hidden backdrop:bg-black/75 backdrop:backdrop-blur-md"
    @click="onBackdropClick"
  >
    <div class="flex flex-col max-h-[85vh]">
      <!-- Header Bar with Cybernetic Styling -->
      <header class="px-6 py-5 bg-[#151722] border-b border-white/[0.08] flex items-center justify-between gap-4 card-sheen">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <UIcon
              name="i-lucide-scale"
              class="w-3 h-3 text-amber-400"
            />
            <span>{{ locale === 'ru' ? 'Юридическая верификация' : 'Open Source License' }}</span>
          </div>
          <h2
            id="license-dialog-title"
            class="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2.5"
          >
            <span>{{ activeLicenseData.name }}</span>
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-[#1e2230] text-zinc-300 border border-white/[0.08]">
              {{ activeLicenseData.badge }}
            </span>
          </h2>
        </div>

        <button
          ref="closeButtonRef"
          type="button"
          class="p-2 rounded-xl border border-white/[0.08] bg-[#1a1d28] hover:bg-[#222738] text-zinc-400 hover:text-white transition-all duration-150 card-sheen cursor-pointer focus-visible:outline"
          :aria-label="locale === 'ru' ? 'Закрыть модальное окно' : 'Close license modal'"
          @click="closeLicenseModal"
        >
          <UIcon
            name="i-lucide-x"
            class="w-5 h-5"
          />
        </button>
      </header>

      <!-- License Switcher Tabs -->
      <div class="px-6 py-2.5 bg-[#0d0e14] border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto text-xs font-mono">
        <span class="text-zinc-500 text-[11px] uppercase tracking-wider mr-1">
          {{ locale === 'ru' ? 'Выбор:' : 'Select:' }}
        </span>
        <button
          type="button"
          class="px-3 py-1 rounded-lg border transition-all duration-150 cursor-pointer"
          :class="activeLicenseData.spdx === 'MIT'
            ? 'bg-amber-400/15 border-amber-500/40 text-amber-300 font-semibold'
            : 'bg-[#14161f] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-[#1a1d28]'"
          @click="openLicenseModal('MIT')"
        >
          MIT (mysite & blueprints)
        </button>
        <button
          type="button"
          class="px-3 py-1 rounded-lg border transition-all duration-150 cursor-pointer"
          :class="activeLicenseData.spdx === 'Apache-2.0'
            ? 'bg-amber-400/15 border-amber-500/40 text-amber-300 font-semibold'
            : 'bg-[#14161f] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-[#1a1d28]'"
          @click="openLicenseModal('Apache-2.0')"
        >
          Apache 2.0 (Cardinal & Panel)
        </button>
        <button
          type="button"
          class="px-3 py-1 rounded-lg border transition-all duration-150 cursor-pointer"
          :class="activeLicenseData.spdx === 'AGPL-3.0-or-later'
            ? 'bg-amber-400/15 border-amber-500/40 text-amber-300 font-semibold'
            : 'bg-[#14161f] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-[#1a1d28]'"
          @click="openLicenseModal('AGPL-3.0-or-later')"
        >
          AGPL 3.0 (Wings)
        </button>
      </div>

      <!-- Scrollable Modal Body -->
      <div class="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
        <!-- Summary Callout -->
        <div class="p-4 rounded-xl bg-[#141620] border border-white/[0.06] text-zinc-300 leading-relaxed font-sans card-sheen">
          <p>{{ activeLicenseData.summary[locale as 'ru' | 'en'] }}</p>
        </div>

        <!-- 3-Column Permissions Matrix -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <!-- Permissions -->
          <div class="p-3.5 rounded-xl bg-[#141720] border border-white/[0.06] space-y-2">
            <div class="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <UIcon
                name="i-lucide-check-circle"
                class="w-4 h-4"
              />
              <span>{{ locale === 'ru' ? 'Разрешено' : 'Permissions' }}</span>
            </div>
            <ul class="space-y-1 text-zinc-400 text-[11px]">
              <li
                v-for="item in activeLicenseData.permissions"
                :key="item.en"
                class="flex items-center gap-1.5"
              >
                <span class="text-emerald-500/80">✓</span>
                <span>{{ item[locale as 'ru' | 'en'] }}</span>
              </li>
            </ul>
          </div>

          <!-- Limitations -->
          <div class="p-3.5 rounded-xl bg-[#141720] border border-white/[0.06] space-y-2">
            <div class="flex items-center gap-1.5 text-rose-400 font-semibold">
              <UIcon
                name="i-lucide-x-circle"
                class="w-4 h-4"
              />
              <span>{{ locale === 'ru' ? 'Ограничения' : 'Limitations' }}</span>
            </div>
            <ul class="space-y-1 text-zinc-400 text-[11px]">
              <li
                v-for="item in activeLicenseData.limitations"
                :key="item.en"
                class="flex items-center gap-1.5"
              >
                <span class="text-rose-500/80">✕</span>
                <span>{{ item[locale as 'ru' | 'en'] }}</span>
              </li>
            </ul>
          </div>

          <!-- Conditions -->
          <div class="p-3.5 rounded-xl bg-[#141720] border border-white/[0.06] space-y-2">
            <div class="flex items-center gap-1.5 text-amber-400 font-semibold">
              <UIcon
                name="i-lucide-info"
                class="w-4 h-4"
              />
              <span>{{ locale === 'ru' ? 'Условия' : 'Conditions' }}</span>
            </div>
            <ul class="space-y-1 text-zinc-400 text-[11px]">
              <li
                v-for="item in activeLicenseData.conditions"
                :key="item.en"
                class="flex items-center gap-1.5"
              >
                <span class="text-amber-500/80">ℹ</span>
                <span>{{ item[locale as 'ru' | 'en'] }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Full License Text Code Box -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span class="uppercase tracking-wider text-[10px] text-zinc-500">
              {{ locale === 'ru' ? 'Полный текст лицензии' : 'Full License Text' }}
            </span>
            <span class="text-[10px] text-zinc-500">SPDX: {{ activeLicenseData.spdx }}</span>
          </div>

          <pre class="p-4 rounded-xl bg-[#090a0e] border border-white/[0.08] text-zinc-300 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap select-all max-h-60 overflow-y-auto"><code>{{ activeLicenseData.text }}</code></pre>
        </div>
      </div>

      <!-- Footer Action Row -->
      <footer class="px-6 py-4 bg-[#151722] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <a
          href="https://github.com/animesao/animesao.github.io/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <UIcon
            name="i-simple-icons-github"
            class="w-4 h-4 text-zinc-400"
          />
          <span>{{ locale === 'ru' ? 'LICENSE в репозитории' : 'View LICENSE in repo' }}</span>
          <UIcon
            name="i-lucide-external-link"
            class="w-3 h-3 text-zinc-500"
          />
        </a>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/[0.08] bg-[#1a1d28] hover:bg-[#232736] text-zinc-300 hover:text-white transition-all duration-150 card-sheen cursor-pointer"
            @click="copyLicenseText"
          >
            <UIcon
              :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
              class="w-3.5 h-3.5 transition-transform"
              :class="copied ? 'text-emerald-400 scale-110' : ''"
            />
            <span>{{ copied ? (locale === 'ru' ? 'Скопировано!' : 'Copied!') : (locale === 'ru' ? 'Скопировать текст' : 'Copy Text') }}</span>
          </button>

          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-zinc-100 text-black font-semibold hover:bg-white transition-colors cursor-pointer"
            @click="closeLicenseModal"
          >
            {{ locale === 'ru' ? 'Закрыть' : 'Close' }}
          </button>
        </div>
      </footer>
    </div>
  </dialog>
</template>

<style scoped>
/* Modal styling and transitions adhering to modern-web-guidance */
dialog:modal {
  overscroll-behavior: contain;
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              overlay 0.25s allow-discrete,
              display 0.25s allow-discrete;
  opacity: 0;
  transform: scale(0.96) translateY(12px);
}

dialog[open]:modal {
  opacity: 1;
  transform: scale(1) translateY(0);
}

@starting-style {
  dialog[open]:modal {
    opacity: 0;
    transform: scale(0.96) translateY(12px);
  }
}

dialog::backdrop {
  overflow: hidden;
  overscroll-behavior: contain;
  background: rgba(5, 7, 10, 0.78);
  backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity 0.25s ease-out,
              overlay 0.25s allow-discrete,
              display 0.25s allow-discrete;
}

dialog[open]::backdrop {
  opacity: 1;
}

@starting-style {
  dialog[open]::backdrop {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  dialog:modal,
  dialog::backdrop {
    transition: none !important;
    transform: none !important;
  }
}
</style>
