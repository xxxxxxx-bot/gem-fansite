<script setup>
import MedalBadge from '../components/MedalBadge.vue'
import { fanclub } from '../data/site.js'

const icons = {
  medal:
    '<circle cx="12" cy="9" r="5"/><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  camera:
    '<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M9 7l1.5-2.5h3L15 7"/>',
  gift: '<rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M4 10h16M12 10v10M12 10c-4 0-5.5-2-5-3.5S9.5 4.5 12 10c2.5-5.5 5-5 5.5-3.5S16 10 12 10z"/>',
  heart:
    '<path d="M12 20s-7-4.3-9-8.5C1.6 8.4 3.5 5 7 5c2.2 0 3.8 1.2 5 3 1.2-1.8 2.8-3 5-3 3.5 0 5.4 3.4 4 6.5-2 4.2-9 8.5-9 8.5z"/>',
  ticket:
    '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M15 7v10" stroke-dasharray="2.5 2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
}
</script>

<template>
  <section class="relative overflow-hidden pb-16 pt-36">
    <div class="orb left-[-8%] top-[-15%] h-96 w-96 bg-gold/15"></div>
    <div class="noise absolute inset-0"></div>
    <div class="relative mx-auto max-w-6xl px-6">
      <p v-reveal class="section-label">Fan Club</p>
      <h1 v-reveal="100" class="mt-4 text-4xl font-black md:text-6xl">
        棋士<span class="text-gradient-gold">联盟</span>
      </h1>
      <p v-reveal="200" class="mt-6 max-w-2xl text-sm leading-relaxed text-cream/70">
        {{ fanclub.intro }}
      </p>
    </div>
  </section>

  <!-- 勋章 + 价格 -->
  <section class="mx-auto max-w-6xl px-6 pb-24">
    <div
      class="relative grid items-center gap-12 overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-br from-[#241c0e] via-[#171221] to-[#0b0812] p-10 md:grid-cols-[auto_1fr] md:p-16"
    >
      <div class="noise absolute inset-0"></div>
      <div class="relative mx-auto pt-6">
        <MedalBadge />
      </div>
      <div class="relative">
        <h2 v-reveal class="text-2xl font-black md:text-3xl">一枚勋章 = 一位棋士</h2>
        <p v-reveal="80" class="mt-4 max-w-xl text-sm leading-relaxed text-cream/70">
          「棋士勋章」象征棋士身份，拥有
          一枚即代表加入棋士联盟。会籍终身有效，无需续费，与全球棋士一起见证每一个舞台。
        </p>
        <p v-reveal="160" class="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span class="text-sm text-muted">终身会籍</span>
          <span class="text-gradient-gold text-4xl font-black">RMB 220</span>
          <span class="text-xs text-muted">/ HKD 250 · TWD 1,200 · USD 38</span>
        </p>
        <a
          v-reveal="240"
          :href="fanclub.officialUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-gold mt-9"
          >前往官方网站加入 ↗</a
        >
        <p class="mt-4 text-xs text-muted/70">* 本页为粉丝整理介绍，入会方式与最新权益以官方站点为准。</p>
      </div>
    </div>
  </section>

  <!-- 会员权益 -->
  <section class="mx-auto max-w-6xl px-6 pb-24">
    <p v-reveal class="section-label">Member Benefits</p>
    <h2 v-reveal="80" class="mt-3 text-3xl font-black md:text-4xl">会员权益</h2>
    <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(b, i) in fanclub.benefits"
        :key="b.title"
        v-reveal="i * 70"
        class="card-lift group rounded-2xl border border-white/5 bg-surface p-7"
      >
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-violet-500/20 text-gold transition group-hover:from-gold/30 group-hover:to-violet-500/30"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-html="icons[b.icon]"
          ></svg>
        </div>
        <h3 class="mt-5 font-bold">{{ b.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ b.desc }}</p>
      </div>
    </div>
  </section>

  <!-- 各地棋士联盟 -->
  <section class="mx-auto max-w-6xl px-6 pb-28">
    <p v-reveal class="section-label">Regions</p>
    <h2 v-reveal="80" class="mt-3 text-3xl font-black md:text-4xl">各地棋士联盟</h2>
    <div class="mt-10 flex flex-wrap gap-3">
      <span
        v-for="(r, i) in fanclub.regions"
        :key="r"
        v-reveal="i * 60"
        class="rounded-xl border border-lilac/25 bg-white/[0.03] px-6 py-3 font-bold tracking-widest transition hover:border-gold/50 hover:text-gold"
        >{{ r }}棋士联盟</span
      >
    </div>
  </section>
</template>
