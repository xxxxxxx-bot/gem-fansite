<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { mvs, mvSpecial } from '../data/mvs.js'

const current = ref(null)

function open(mv) {
  current.value = mv
}

function close() {
  current.value = null
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
        官方 MV 精选，点开在站内直接播放（Bilibili
        官方嵌入播放器）。来源优先官方账号投稿，其余为画质最好的修复版，逐条都有标注；也可一键跳转 B 站观看。
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 pb-24">
    <div class="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      <button v-for="(m, i) in mvs" :key="m.bvid" v-reveal="(i % 3) * 80" class="group text-left" @click="open(m)">
        <div
          class="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-surface transition duration-500 group-hover:-translate-y-1.5 group-hover:border-gold/40"
        >
          <img
            :src="m.cover"
            :alt="`《${m.title}》MV 封面`"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20"></div>
          <span
            class="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-lg text-cream backdrop-blur transition group-hover:scale-110 group-hover:bg-gold group-hover:text-ink"
          >
            ▶
          </span>
          <span
            class="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] tracking-[0.2em]"
            :class="m.official ? 'bg-gold/90 text-ink' : 'bg-black/50 text-cream/80 backdrop-blur'"
          >
            {{ m.official ? '官方投稿' : '高清搬运' }}
          </span>
          <span class="absolute bottom-3 left-4 font-mono text-[11px] tabular-nums text-cream/70">{{ m.year }}</span>
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
        @click="open(mvSpecial)"
      >
        <img
          :src="mvSpecial.cover"
          alt="《启示录》MV 连续剧全旅程版封面"
          loading="lazy"
          class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20"></div>
        <div class="relative flex items-center gap-6 p-8 md:p-12">
          <span
            class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f8e9a0] via-[#e9c46a] to-[#c9963f] text-xl text-[#171102] shadow-[0_8px_30px_rgba(233,196,106,0.35)] transition group-hover:scale-110"
          >
            ▶
          </span>
          <div>
            <span class="rounded-full bg-gold/90 px-2.5 py-1 text-[10px] tracking-[0.2em] text-ink">官方投稿</span>
            <h3 class="mt-3 text-xl font-black md:text-2xl">{{ mvSpecial.title }}</h3>
            <p class="mt-2 max-w-2xl text-sm leading-relaxed text-cream/80">{{ mvSpecial.note }}</p>
          </div>
        </div>
      </button>
    </div>

    <p class="mt-10 text-xs leading-relaxed text-muted/70">
      * 视频均在 Bilibili 播放：标注「官方投稿」的来自 GEM鄧紫棋 / 蜂鸟音乐官方账号，标注「高清搬运」的为社区修复版本（源可能失效，届时会更新）。
      版权归权利方所有，仅作粉丝整理展示。
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
            :src="`https://player.bilibili.com/player.html?bvid=${current.bvid}&autoplay=0&high_quality=1&danmaku=0`"
            class="h-full w-full"
            scrolling="no"
            frameborder="0"
            allowfullscreen
            :title="`${current.title} MV`"
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
              :href="`https://www.bilibili.com/video/${current.bvid}`"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full border border-white/15 px-3 py-1.5 text-xs text-cream/80 transition hover:border-gold hover:text-gold"
              >B 站打开 ↗</a
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
