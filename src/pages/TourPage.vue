<script setup>
import { milestones, tour } from '../data/site.js'
import { tours, totalShows, totalNights } from '../data/tours.js'

const nightLabel = (n) => (n > 1 ? `${n} 场` : '')
</script>

<template>
  <section class="relative overflow-hidden pb-16 pt-36">
    <div class="orb right-[-8%] top-[-10%] h-[420px] w-[420px] bg-violet-600/35"></div>
    <div class="orb left-[-6%] bottom-[-30%] h-80 w-80 bg-amber-400/15" style="animation-delay: -6s"></div>
    <div class="noise absolute inset-0"></div>
    <div class="relative mx-auto max-w-6xl px-6">
      <p v-reveal class="section-label">World Tour</p>
      <h1 v-reveal="100" class="text-gradient-lilac mt-4 text-4xl font-black md:text-6xl">
        {{ tour.name }}
      </h1>
      <p v-reveal="160" class="mt-3 text-lg tracking-[0.35em] text-cream/60">世界巡回演唱会</p>
      <p v-reveal="240" class="mt-6 max-w-2xl text-sm leading-relaxed text-cream/70">
        从 2011 年首登红磡到 2026 年巡演破纪录，四轮大型世界巡回共 {{ totalShows }} 站、{{ totalNights }}
        场。2026 年 7 月 25 日天津站达成个人第 300 场演唱会，创下华语女歌手纪录。
      </p>
    </div>
  </section>

  <!-- 里程碑 -->
  <section class="mx-auto max-w-6xl px-6 pb-20">
    <div class="grid gap-5 md:grid-cols-3">
      <div
        v-for="(m, i) in milestones"
        :key="m.title"
        v-reveal="i * 100"
        class="card-lift rounded-2xl border border-white/5 bg-surface p-8"
      >
        <p class="text-gradient-gold text-5xl font-black">{{ m.year }}</p>
        <h3 class="mt-4 font-bold">{{ m.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ m.desc }}</p>
      </div>
    </div>
  </section>

  <!-- 全部场次 -->
  <section class="mx-auto max-w-6xl px-6 pb-24">
    <p v-reveal class="section-label">All Shows</p>
    <h2 v-reveal="80" class="mt-3 text-2xl font-black md:text-3xl">
      历年巡演全记录
      <span class="ml-3 text-base font-normal text-muted">{{ totalShows }} 站 · {{ totalNights }} 场</span>
    </h2>

    <div v-for="t in tours" :key="t.name" class="mt-14">
      <div v-reveal class="flex flex-wrap items-baseline justify-between gap-2">
        <h3 class="text-xl font-black">{{ t.name }}</h3>
        <p class="text-sm text-muted">
          {{ t.years }} · {{ t.shows.length }} 站 ·
          {{ t.shows.reduce((m, s) => m + s.nights, 0) }} 场
        </p>
      </div>
      <div class="mt-5 overflow-hidden rounded-2xl border border-line">
        <div
          v-for="s in t.shows"
          :key="s.date + s.city"
          class="grid gap-x-4 gap-y-0.5 border-b border-line px-5 py-3 transition last:border-b-0 hover:bg-white/[0.03] md:grid-cols-[200px_150px_1fr_56px] md:items-baseline"
        >
          <p class="font-mono text-[13px] tabular-nums text-gold">{{ s.date }}</p>
          <p class="text-sm font-bold">{{ s.city }}</p>
          <p class="text-[13px] leading-relaxed text-muted">{{ s.venue }}</p>
          <p class="text-right text-xs text-lilac tabular-nums">{{ nightLabel(s.nights) }}</p>
        </div>
      </div>
    </div>

    <p class="mt-6 text-xs leading-relaxed text-muted/70">
      * 场次信息整理自 G.E.M. 官方网站（iamgem.com/tours），仅作粉丝整理展示；购票请以官方及票务平台渠道为准。
    </p>
  </section>

  <!-- 内地最终六站 -->
  <section class="mx-auto max-w-6xl px-6 pb-28">
    <div
      class="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#1b1330] to-[#0b0812] p-10 md:p-14"
    >
      <div class="orb right-[-6%] bottom-[-40%] h-72 w-72 bg-violet-500/25"></div>
      <div class="noise absolute inset-0"></div>
      <div class="relative">
        <p v-reveal class="section-label">The Final Six · 内地最终六站</p>
        <div class="mt-9 flex flex-wrap gap-3">
          <span
            v-for="(c, i) in tour.finalSix"
            :key="c"
            v-reveal="i * 70"
            class="rounded-xl border border-lilac/25 bg-white/[0.03] px-7 py-3.5 text-lg font-bold tracking-widest transition hover:border-gold/50 hover:text-gold"
            >{{ c }}</span
          >
        </div>
      </div>
    </div>
  </section>
</template>
