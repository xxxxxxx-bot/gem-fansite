<script setup>
import { timeline } from '../data/site.js'
</script>

<template>
  <section class="relative overflow-hidden pb-16 pt-36">
    <div class="orb right-[-10%] top-[-15%] h-96 w-96 bg-violet-600/30"></div>
    <div class="noise absolute inset-0"></div>
    <div class="relative mx-auto max-w-6xl px-6">
      <p v-reveal class="section-label">About</p>
      <h1 v-reveal="100" class="mt-4 text-4xl font-black md:text-6xl">
        关于 <span class="text-gradient-gold">G.E.M.</span>
      </h1>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 pb-20">
    <div class="max-w-3xl space-y-6">
      <p v-reveal class="text-base leading-loose text-cream/80">
        邓紫棋（G.E.M.，Get Everybody Moving），1991 年 8 月 16 日出生于上海，4
        岁随家人移居香港。2008 年，16 岁的她发行首张 EP
        正式出道，凭极具爆发力的嗓音与创作才华迅速崭露头角。
      </p>
      <p v-reveal="80" class="text-base leading-loose text-cream/80">
        2014 年，她在《我是歌手》第二季的舞台被更多听众认识；2016 年，一首《光年之外》成为传唱全球的现象级单曲。从香港红磡到世界巡演，她始终坚持唱作合一，一步步把华语流行音乐带上更大的舞台。
      </p>
      <p v-reveal="160" class="text-base leading-loose text-cream/80">
        2026 年 7 月，她在天津站达成个人第 300
        场演唱会。从「泡沫」到「启示录」，从少女心气到科幻寓言——她仍在路上。
      </p>
    </div>

    <div v-reveal="240" class="relative mt-14 max-w-3xl overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-br from-[#241c0e] to-[#0b0812] p-10">
      <div class="noise absolute inset-0"></div>
      <p class="relative text-xl font-bold leading-relaxed md:text-2xl">
        “<span class="text-gradient-gold">Get Everybody Moving</span>
        ——让所有人动起来。”
      </p>
      <p class="relative mt-4 text-xs tracking-[0.3em] text-muted">G.E.M. 名字的由来</p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 pb-28">
    <p v-reveal class="section-label">Timeline</p>
    <h2 v-reveal="80" class="mt-3 text-3xl font-black md:text-4xl">一路走来</h2>

    <div class="relative mt-12">
      <div
        class="absolute bottom-0 left-[7.5px] top-0 w-px bg-gradient-to-b from-gold/50 via-violet-400/30 to-transparent"
      ></div>
      <ol class="flex flex-col gap-9">
        <li v-for="(t, i) in timeline" :key="t.year" v-reveal="i * 60" class="relative pl-10">
          <span class="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-gold bg-ink"></span>
          <p class="text-gradient-gold font-mono text-lg font-black">{{ t.year }}</p>
          <p class="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-cream/75">{{ t.text }}</p>
        </li>
      </ol>
    </div>

    <p class="mt-14 text-xs text-muted/70">* 页面内容整理自公开资料，仅作粉丝整理展示。</p>
  </section>
</template>
