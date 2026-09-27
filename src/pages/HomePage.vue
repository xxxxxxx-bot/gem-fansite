<script setup>
import AlbumCover from '../components/AlbumCover.vue'
import MedalBadge from '../components/MedalBadge.vue'
import { albums, songs, stats, tour } from '../data/site.js'

const featuredAlbums = ['启示录', '摩天动物园', 'Xposed', '新的心跳']
  .map((t) => albums.find((a) => a.title === t))
  .filter(Boolean)
</script>

<template>
  <!-- Hero -->
  <section class="relative flex min-h-[100svh] items-center overflow-hidden">
    <div class="orb left-[-12%] top-[8%] h-[480px] w-[480px] bg-violet-600/40"></div>
    <div class="orb right-[-10%] bottom-[12%] h-[420px] w-[420px] bg-amber-400/20" style="animation-delay: -7s"></div>
    <div class="noise absolute inset-0"></div>

    <span
      class="absolute right-10 top-1/2 hidden -translate-y-1/2 text-xs tracking-[0.8em] text-cream/35 lg:block"
      style="writing-mode: vertical-rl"
      >鄧紫棋 · GET EVERYBODY MOVING</span
    >

    <div class="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
      <p v-reveal class="section-label">Gloria Tang · 邓紫棋</p>
      <h1
        v-reveal="120"
        class="text-gradient-lilac mt-6 text-[clamp(4.5rem,16vw,11rem)] font-black leading-[0.95] tracking-tight"
      >
        G.E.M.
      </h1>
      <p v-reveal="240" class="mt-8 max-w-xl text-lg leading-relaxed text-cream/75">
        从香港舞台唱到世界舞台的创作歌手。这里是歌迷为她搭建的致敬角落——音乐、巡演与「棋士联盟」的故事。
      </p>
      <div v-reveal="360" class="mt-12 flex flex-wrap gap-4">
        <RouterLink to="/music" class="btn btn-gold">探索音乐世界 →</RouterLink>
        <RouterLink to="/fanclub" class="btn btn-ghost">了解棋士联盟</RouterLink>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
      <span class="text-[10px] tracking-[0.5em] text-muted">SCROLL</span>
      <span class="h-14 w-px animate-pulse bg-gradient-to-b from-gold to-transparent"></span>
    </div>
  </section>

  <!-- 歌名跑马灯 -->
  <section class="marquee overflow-hidden border-y border-line py-5">
    <div class="marquee-track">
      <template v-for="n in 2" :key="n">
        <span
          v-for="s in songs"
          :key="`${n}-${s}`"
          class="mx-5 flex items-center gap-10 whitespace-nowrap text-sm tracking-[0.2em] text-cream/45"
        >
          {{ s }} <span class="text-gold/60">✦</span>
        </span>
      </template>
    </div>
  </section>

  <!-- 数据 -->
  <section class="mx-auto max-w-6xl px-6 py-24">
    <div class="grid grid-cols-2 gap-y-12 md:grid-cols-4">
      <div v-for="(s, i) in stats" :key="s.label" v-reveal="i * 100" class="text-center">
        <p class="text-gradient-gold text-5xl font-black md:text-6xl">{{ s.value }}</p>
        <p class="mt-3 text-sm text-muted">{{ s.label }}</p>
      </div>
    </div>
  </section>

  <!-- 精选专辑 -->
  <section class="mx-auto max-w-6xl px-6 pb-24">
    <div class="mb-10 flex items-end justify-between">
      <div>
        <p v-reveal class="section-label">Selected Works</p>
        <h2 v-reveal="80" class="mt-3 text-3xl font-black md:text-4xl">精选专辑</h2>
      </div>
      <RouterLink v-reveal to="/music" class="pb-1 text-sm text-gold transition hover:opacity-80"
        >全部作品 →</RouterLink
      >
    </div>
    <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
      <div v-for="(a, i) in featuredAlbums" :key="a.title" v-reveal="i * 90" class="card-lift rounded-2xl">
        <AlbumCover :title="a.title" :year="a.year" :colors="a.colors" :tag="a.type" :cover="a.cover" show-caption />
        <p class="mt-4 line-clamp-2 text-xs leading-relaxed text-muted">{{ a.desc }}</p>
      </div>
    </div>
  </section>

  <!-- 巡演横幅 -->
  <section class="mx-auto max-w-6xl px-6 pb-24">
    <div
      v-reveal
      class="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#1b1330] via-[#141024] to-[#0b0812] p-10 md:p-16"
    >
      <div class="orb right-[-5%] top-[-30%] h-72 w-72 bg-violet-500/30"></div>
      <div class="noise absolute inset-0"></div>
      <p
        class="text-outline pointer-events-none absolute -bottom-8 right-4 select-none text-[26vw] font-black leading-none md:text-[10rem]"
      >
        300
      </p>
      <div class="relative">
        <p class="section-label">World Tour</p>
        <h2 class="mt-3 text-3xl font-black md:text-5xl">
          <span class="text-gradient-lilac">{{ tour.name }}</span> 世界巡回演唱会
        </h2>
        <p class="mt-5 max-w-xl text-sm leading-relaxed text-cream/70">
          2023 年 12 月自广州启航，足迹跨越三大洲；2026 年 7 月天津站达成个人第 300
          场，创下华语女歌手纪录。
        </p>
        <div class="mt-8 flex flex-wrap gap-2.5">
          <span
            v-for="c in tour.finalSix"
            :key="c"
            class="rounded-full border border-white/10 px-4 py-1.5 text-xs tracking-widest text-cream/70"
            >{{ c }}</span
          >
        </div>
        <RouterLink to="/tour" class="btn btn-ghost mt-10">查看巡演回顾 →</RouterLink>
      </div>
    </div>
  </section>

  <!-- 棋士联盟横幅 -->
  <section class="mx-auto max-w-6xl px-6 pb-28">
    <div
      v-reveal
      class="relative grid items-center gap-12 overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-br from-[#241c0e] via-[#171221] to-[#0b0812] p-10 md:grid-cols-[auto_1fr] md:p-16"
    >
      <div class="noise absolute inset-0"></div>
      <div class="relative mx-auto pt-6">
        <MedalBadge />
      </div>
      <div class="relative">
        <p class="section-label">Fan Club</p>
        <h2 class="mt-3 text-3xl font-black md:text-4xl">棋士联盟 · <span class="text-gradient-gold">棋士勋章</span></h2>
        <p class="mt-5 max-w-xl text-sm leading-relaxed text-cream/70">
          一枚勋章，即代表加入邓紫棋官方歌迷会——会籍终身有效，与全球棋士一起见证每一个舞台。
        </p>
        <RouterLink to="/fanclub" class="btn btn-gold mt-9">了解棋士联盟 →</RouterLink>
      </div>
    </div>
  </section>
</template>
