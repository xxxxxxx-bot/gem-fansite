<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const links = [
  { to: '/', label: '首页' },
  { to: '/music', label: '音乐' },
  { to: '/tour', label: '巡演' },
  { to: '/fanclub', label: '棋士联盟' },
  { to: '/about', label: '关于' },
]

const open = ref(false)
const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header class="glass fixed inset-x-0 top-0 z-50 border-b border-line">
    <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <RouterLink to="/" class="flex items-baseline gap-2.5">
        <span class="text-gradient-gold text-xl font-black tracking-[0.18em]">G.E.M.</span>
        <span class="hidden text-xs text-muted sm:inline">邓紫棋 · 粉丝致敬站</span>
      </RouterLink>

      <ul class="hidden items-center gap-9 md:flex">
        <li v-for="l in links" :key="l.to">
          <RouterLink :to="l.to" class="nav-link">{{ l.label }}</RouterLink>
        </li>
      </ul>

      <button
        class="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream md:hidden"
        aria-label="菜单"
        @click="open = !open"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <template v-if="!open">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </template>
          <template v-else>
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </template>
        </svg>
      </button>
    </nav>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div v-if="open" class="glass border-t border-line px-6 py-4 md:hidden">
        <ul class="flex flex-col gap-1">
          <li v-for="l in links" :key="l.to">
            <RouterLink
              :to="l.to"
              class="block rounded-lg px-3 py-2.5 text-sm text-cream/80 transition hover:bg-white/5 hover:text-gold"
              >{{ l.label }}</RouterLink
            >
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>
