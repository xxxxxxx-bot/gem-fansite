<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// 访问统计：不蒜子 v3.6.9（busuanzi.cc，cdn.busuanzi.cc）
// 提供：今日访问量 / 今日访客（每日 00:00 自动重置）+ 累计访问量 / 访客数
// 加载失败或超时整块自动隐藏，不影响页面
const ready = ref(false)
const failed = ref(false)
let timer

// 建站日期：首个提交 2026-09-27
const SITE_LAUNCH_DATE = '2026-09-27'
const runningDays = computed(() => {
  const launch = new Date(SITE_LAUNCH_DATE + 'T00:00:00')
  const days = Math.floor((Date.now() - launch.getTime()) / 86400000) + 1
  return days > 0 ? days : 1
})

function pollBusuanzi(tries = 20) {
  const pv = document.getElementById('busuanzi_site_pv')
  if (pv && pv.textContent.trim()) {
    ready.value = true
    clearTimeout(timer)
  } else if (tries > 0) {
    setTimeout(() => pollBusuanzi(tries - 1), 300)
  } else {
    failed.value = true
  }
}

function onScriptError() {
  failed.value = true
  clearTimeout(timer)
}

onMounted(() => {
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js'
  s.onload = () => pollBusuanzi()
  s.onerror = onScriptError
  document.head.appendChild(s)
  timer = setTimeout(() => {
    if (!ready.value) failed.value = true
  }, 8000)
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div
    v-show="ready && !failed"
    class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs tabular-nums text-muted/80"
  >
    <span class="inline-flex items-center gap-1.5">
      <svg class="h-3.5 w-3.5 text-gold/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        <circle cx="12" cy="12" r="4" />
      </svg>
      今日访问 <b id="busuanzi_today_pv" class="font-bold text-gold"></b>
    </span>
    <span class="inline-flex items-center gap-1.5">
      <svg class="h-3.5 w-3.5 text-lilac/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      今日访客 <b id="busuanzi_today_uv" class="font-bold text-lilac"></b>
    </span>
    <span class="opacity-40">|</span>
    <span class="inline-flex items-center gap-1.5">
      <svg class="h-3.5 w-3.5 text-gold/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      累计访问 <b id="busuanzi_site_pv" class="font-bold text-gold"></b>
    </span>
    <span class="inline-flex items-center gap-1.5">
      <svg class="h-3.5 w-3.5 text-lilac/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      访客数 <b id="busuanzi_site_uv" class="font-bold text-lilac"></b>
    </span>
    <span class="opacity-40">|</span>
    <span class="inline-flex items-center gap-1.5">
      <svg class="h-3.5 w-3.5 text-cream/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
      已运营 <b class="font-bold text-cream">{{ runningDays }}</b> 天
    </span>
  </div>
</template>
