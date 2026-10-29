<script setup lang="ts">
import { ref, computed } from 'vue'

const { locale } = useI18n()

type TerminalTabId = 'runtime' | 'wings' | 'panel'

interface TerminalTab {
  id: TerminalTabId
  label: string
  badge: string
  command: string
  description: {
    ru: string
    en: string
  }
  lines: Array<{
    type: 'cmd' | 'info' | 'success' | 'detail' | 'prompt'
    text: string
  }>
}

const activeTab = ref<TerminalTabId>('runtime')
const copied = ref(false)

const tabs: TerminalTab[] = [
  {
    id: 'runtime',
    label: 'Cardinal Runtime',
    badge: 'Go / Linux Primitives',
    command: 'cardinal run --rm -p 8080:80 alpine:latest sh',
    description: {
      ru: 'Автономный запуск OCI-контейнера через прямые вызовы namespaces и cgroups v2 без Docker-демона',
      en: 'Daemonless OCI container execution via direct namespaces and cgroups v2 primitives'
    },
    lines: [
      { type: 'cmd', text: '$ cardinal run --rm -p 8080:80 alpine:latest sh' },
      { type: 'info', text: '[+] Initializing cgroups v2: cpu, memory, pids controllers' },
      { type: 'info', text: '[+] Isolating Linux namespaces: PID, NET, IPC, UTS, MNT' },
      { type: 'info', text: '[+] Mounting OverlayFS layer at /var/lib/cardinal/containers/a7e3d1/rootfs' },
      { type: 'success', text: '[+] Bridge interface cardinal0 (172.20.0.1/16) -> IP 172.20.0.4' },
      { type: 'success', text: '[+] Forking isolated process [PID 4192: /bin/sh]' },
      { type: 'detail', text: '[cardinal-a7e3d1 /]# uname -a' },
      { type: 'detail', text: 'Linux cardinal-node 6.8.0-48-generic #48-Ubuntu SMP PREEMPT_DYNAMIC' },
      { type: 'prompt', text: '[cardinal-a7e3d1 /]# ' }
    ]
  },
  {
    id: 'wings',
    label: 'Cardinal Wings',
    badge: 'Go REST & SSE Daemon',
    command: 'cardinal-wings --config /etc/cardinal/wings.yaml',
    description: {
      ru: 'Демон управления: прием команд от Cardinal Panel по REST API, стриминг логов по SSE и SFTP-сервер',
      en: 'Control daemon: handling Cardinal Panel REST requests, log streaming via SSE, and embedded SFTP'
    },
    lines: [
      { type: 'cmd', text: '$ cardinal-wings --config /etc/cardinal/wings.yaml' },
      { type: 'info', text: '2026/10/29 10:24:00 [INFO] Cardinal Wings v0.5.20 daemon starting...' },
      { type: 'info', text: '2026/10/29 10:24:00 [INFO] Connected to cardinal runtime engine via unix socket' },
      { type: 'success', text: '2026/10/29 10:24:00 [INFO] HTTP REST API listener active on 0.0.0.0:8080 (SSE enabled)' },
      { type: 'success', text: '2026/10/29 10:24:00 [INFO] Secure SFTP subsystem listening on 0.0.0.0:2022' },
      { type: 'detail', text: '2026/10/29 10:24:02 [CLIENT] Panel heartbeat authorized (Bearer token authenticated)' },
      { type: 'prompt', text: '2026/10/29 10:24:05 [SSE] Streaming metrics container:a7e3d1 [cpu: 1.2%, mem: 42MB] ' }
    ]
  },
  {
    id: 'panel',
    label: 'Cardinal Panel',
    badge: 'Nuxt 4 + Drizzle ORM',
    command: 'pnpm run dev',
    description: {
      ru: 'Панель управления серверами: Nuxt 4 + Vue 3, Drizzle ORM, WebSocket-терминал и Monaco Editor',
      en: 'Management dashboard: Nuxt 4 + Vue 3, Drizzle ORM, interactive WebSocket terminal, and Monaco Editor'
    },
    lines: [
      { type: 'cmd', text: '$ pnpm run dev' },
      { type: 'info', text: 'Nuxt 4.6.3 with Nitro 2.11.0' },
      { type: 'success', text: '✔ Drizzle ORM: Schema verified & SQLite / MySQL database pool connected' },
      { type: 'success', text: '✔ WebSocket Terminal gateway ready at /ws/terminal' },
      { type: 'info', text: '✔ Monaco Editor LSP ready for runtime config schemas' },
      { type: 'detail', text: '➜ Local:    http://localhost:3000/' },
      { type: 'detail', text: '➜ Network:  http://192.168.1.50:3000/' },
      { type: 'prompt', text: '➜ Ready in 1240ms.' }
    ]
  }
]

const currentTab = computed<TerminalTab>(() => {
  return tabs.find(t => t.id === activeTab.value) ?? (tabs[0] as TerminalTab)
})

async function copyCommand() {
  try {
    await navigator.clipboard.writeText(currentTab.value.command)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Fallback if clipboard API is restricted
    copied.value = false
  }
}
</script>

<template>
  <div class="rounded-xl border border-[#252a38] bg-[#12141c] shadow-2xl shadow-black/40 overflow-hidden font-mono text-xs">
    <!-- Window Top Bar -->
    <div class="px-4 py-3 bg-[#171a24] border-b border-[#252a38] flex flex-wrap items-center justify-between gap-3">
      <!-- Window Controls (Red, Yellow, Green) -->
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-[#ef4444]/80 inline-block border border-black/20" />
        <span class="w-3 h-3 rounded-full bg-[#eab308]/80 inline-block border border-black/20" />
        <span class="w-3 h-3 rounded-full bg-[#22c55e]/80 inline-block border border-black/20" />
        <span class="ml-2 text-[11px] text-zinc-400 font-sans font-medium hidden sm:inline">
          terminal@cardinal-ecosystem
        </span>
      </div>

      <!-- Tab Switcher -->
      <div class="flex items-center bg-[#0e1015] p-1 rounded-lg border border-[#252a38]">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="px-2.5 py-1 rounded-md text-[11px] transition-all font-mono"
          :class="activeTab === tab.id
            ? 'bg-[#1c202d] text-white font-semibold shadow-sm border border-white/10'
            : 'text-zinc-400 hover:text-zinc-200'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Copy Action -->
      <button
        type="button"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e2230] hover:bg-[#252b3d] text-zinc-300 hover:text-white border border-[#30374b] transition-colors"
        :aria-label="locale === 'ru' ? 'Скопировать команду' : 'Copy command'"
        @click="copyCommand"
      >
        <UIcon
          :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          class="w-3.5 h-3.5"
          :class="copied ? 'text-emerald-400' : 'text-zinc-400'"
        />
        <span class="text-[11px]">
          {{ copied
            ? (locale === 'ru' ? 'Скопировано!' : 'Copied!')
            : (locale === 'ru' ? 'Команда' : 'Copy')
          }}
        </span>
      </button>
    </div>

    <!-- Sub-bar: Tab info description -->
    <div class="px-4 py-2 bg-[#14161f] border-b border-[#202431] flex items-center justify-between gap-3 text-[11px] text-zinc-400 font-sans">
      <div class="flex items-center gap-2 truncate">
        <span class="px-1.5 py-0.5 rounded bg-[#202534] text-sky-400 font-mono text-[10px] border border-sky-500/20">
          {{ currentTab.badge }}
        </span>
        <span class="truncate">{{ currentTab.description[locale as 'ru' | 'en'] }}</span>
      </div>
      <span class="text-zinc-500 font-mono text-[10px] hidden md:inline">
        bash 5.2
      </span>
    </div>

    <!-- Terminal Output Area -->
    <div class="p-4 sm:p-5 space-y-2 overflow-x-auto text-[11px] sm:text-xs leading-relaxed bg-[#101219]">
      <div
        v-for="(line, idx) in currentTab.lines"
        :key="idx"
        class="flex items-start gap-2 whitespace-pre-wrap"
      >
        <!-- Command Line -->
        <template v-if="line.type === 'cmd'">
          <span class="text-emerald-400 font-bold select-none">➜</span>
          <span class="text-white font-semibold">{{ line.text }}</span>
        </template>

        <!-- Informational Log Line -->
        <template v-else-if="line.type === 'info'">
          <span class="text-sky-400 select-none">ℹ</span>
          <span class="text-zinc-300">{{ line.text }}</span>
        </template>

        <!-- Success Log Line -->
        <template v-else-if="line.type === 'success'">
          <span class="text-emerald-400 select-none">✔</span>
          <span class="text-emerald-300">{{ line.text }}</span>
        </template>

        <!-- Detail / Standard Output -->
        <template v-else-if="line.type === 'detail'">
          <span class="text-zinc-500 select-none">·</span>
          <span class="text-zinc-400">{{ line.text }}</span>
        </template>

        <!-- Prompt with blinking cursor -->
        <template v-else-if="line.type === 'prompt'">
          <span class="text-sky-400 select-none">#</span>
          <span class="text-zinc-200">{{ line.text }}</span>
          <span class="inline-block w-2 h-4 bg-sky-400 cursor-blink -mb-0.5 ml-0.5" />
        </template>
      </div>
    </div>
  </div>
</template>
