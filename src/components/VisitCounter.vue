<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 累计访问量（PV）与访客数（UV），基于不蒜子（busuanzi）统计
// 纯静态站点无后端，由不蒜子云端计数；加载失败时整块自动隐藏
const ready = ref(false)
const failed = ref(false)
let timer

function pollBusuanzi(tries = 20) {
  const pv = document.getElementById('busuanzi_value_site_pv')
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
  s.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
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
    class="flex items-center justify-center gap-2 text-xs tabular-nums text-muted/80"
  >
    <span class="inline-flex items-center gap-1.5">
      <svg class="h-3.5 w-3.5 text-gold/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      累计访问量 <b id="busuanzi_value_site_pv" class="font-bold text-gold"></b>
    </span>
    <span class="opacity-40">·</span>
    <span class="inline-flex items-center gap-1.5">
      <svg class="h-3.5 w-3.5 text-lilac/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      访客数 <b id="busuanzi_value_site_uv" class="font-bold text-lilac"></b>
    </span>
  </div>
</template>
