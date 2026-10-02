<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { mvs, mvSpecial } from '../data/mvs.js'

const palettes = [
  ['#6d28d9', '#2563eb'],
  ['#be123c', '#7c3aed'],
  ['#0e7490', '#4338ca'],
  ['#b45309', '#be123c'],
  ['#4d7c0f', '#0f766e'],
  ['#1d4ed8', '#7c3aed'],
]

const current = ref(null)

function open(mv) {
  current.value = mv
}

function close() {
  current.value = null
}

function bgStyle(i) {
  const [c1, c2] = palettes[i % palettes.length]
  return {
    background: `radial-gradient(120% 120% at 20% 15%, ${c1} 0%, transparent 55%), radial-gradient(130% 130% at 85% 88%, ${c2} 0%, transparent 58%), #12101c`,
  }
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section class="relative overflow-hidden pb-16 pt-36">
    <div class="orb left-[-8%] top-[-12%] h-96 w-96 bg-violet-600/30"></div>
    <div class="orb right-[-6%] bottom-[-30%] h-80 w-80 bg-amber-400/15" style="animation-delay: -5s"></div>
    <div class="noise absolute inset-0"></div>
    <div class="relative mx-auto max-w-6xl px-6">
      <p v-reveal class="section-label">Music Videos</p>
      <h1 v-reveal="100" class="mt-4 text-4xl font-black md:text-6xl">
        影像<span class="text-gradient-lilac">馆</span>
      </h1>
      <p v-reveal="200" class="mt-6 max-w-2xl text-sm leading-relaxed text-cream/70">
        官方频道的 MV 精选，点开即播。播放走的是 YouTube 官方嵌入，需要能访问 YouTube
        的网络环境；也支持跳转到 YouTube 观看高清原片。
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 pb-24">
    <div class="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      <button v-for="(m, i) in mvs" :key="m.videoId" v-reveal="(i % 3) * 80" class="group text-left" @click="open(m)">
        <div
          class="relative aspect-video overflow-hidden rounded-2xl border border-white/10 transition duration-500 group-hover:-translate-y-1.5 group-hover:border-gold/40"
          :style="bgStyle(i)"
        >
          <div class="noise absolute inset-0"></div>
          <span class="absolute left-4 top-4 font-mono text-[11px] tabular-nums text-cream/60">{{ m.year }}</span>
          <span
            class="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-lg text-cream backdrop-blur transition group-hover:scale-110 group-hover:bg-gold group-hover:text-ink"
          >
            ▶
          </span>
          <span class="absolute bottom-3 right-4 text-[10px] tracking-[0.3em] text-cream/50">OFFICIAL MV</span>
        </div>
        <p class="mt-3 font-bold transition group-hover:text-gold">
          {{ m.title }} <span class="ml-1 text-xs font-normal text-muted">{{ m.en }}</span>
        </p>
        <p class="mt-1 text-xs leading-relaxed text-muted">{{ m.note }}</p>
      </button>
    </div>

    <!-- 特别收录 -->
    <div v-reveal class="mt-16">
      <p class="section-label">Special · 特别收录</p>
      <button
        class="group relative mt-6 block w-full overflow-hidden rounded-3xl border border-white/10 text-left"
        style="
          background:
            radial-gradient(120% 140% at 85% 10%, #7c3aed33 0%, transparent 55%),
            linear-gradient(120deg, #141024, #0b0812);
        "
        @click="open(mvSpecial)"
      >
        <div class="noise absolute inset-0"></div>
        <div class="relative flex items-center gap-6 p-8 md:p-12">
          <span
            class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f8e9a0] via-[#e9c46a] to-[#c9963f] text-xl text-[#171102] shadow-[0_8px_30px_rgba(233,196,106,0.35)] transition group-hover:scale-110"
          >
            ▶
          </span>
          <div>
            <h3 class="text-xl font-black md:text-2xl">{{ mvSpecial.title }}</h3>
            <p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{{ mvSpecial.note }}</p>
          </div>
        </div>
      </button>
    </div>

    <p class="mt-10 text-xs leading-relaxed text-muted/70">
      * 全部视频来自官方 YouTube 频道 GEM鄧紫棋 的官方嵌入播放器，版权归权利方所有；无法直接播放时，可点击播放器左上角标题跳转到 YouTube 视频页观看。
    </p>
  </section>

  <Teleport to="body">
    <div
      v-if="current"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      @click.self="close"
    >
      <div class="w-full max-w-3xl" role="dialog" aria-modal="true" aria-label="MV 播放">
        <div class="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
          <iframe
            :src="`https://www.youtube-nocookie.com/embed/${current.videoId}?autoplay=1&rel=0`"
            class="h-full w-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowfullscreen
            :title="`${current.title} 官方 MV`"
          ></iframe>
        </div>
        <div class="mt-4 flex items-start justify-between gap-4">
          <div class="min-w-0">
            <h3 class="truncate text-lg font-black">
              {{ current.title }} <span class="ml-1 text-sm font-normal text-muted">{{ current.en }}</span>
            </h3>
            <p class="mt-1 text-xs text-muted">{{ current.note }}</p>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <a
              :href="`https://www.youtube.com/watch?v=${current.videoId}`"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full border border-white/15 px-3 py-1.5 text-xs text-cream/80 transition hover:border-gold hover:text-gold"
              >YouTube ↗</a
            >
            <button
              class="rounded-full border border-white/15 px-3 py-1.5 text-xs text-muted transition hover:border-gold hover:text-gold"
              aria-label="关闭"
              @click="close"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
