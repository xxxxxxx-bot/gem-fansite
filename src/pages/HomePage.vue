<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AlbumCover from '../components/AlbumCover.vue'
import MedalBadge from '../components/MedalBadge.vue'
import { albums, songs, stats, tour, newRelease } from '../data/site.js'

const featuredAlbums = ['启示录', '摩天动物园', 'Xposed', '新的心跳']
  .map((t) => {
    const idx = albums.findIndex((a) => a.title === t)
    return idx < 0 ? null : { ...albums[idx], idx }
  })
  .filter(Boolean)

// 《自由的你》上线倒计时
const now = ref(Date.now())
let timer = null
onMounted(() => {
  timer = setInterval(() => (now.value = Date.now()), 1000)
})
onBeforeUnmount(() => clearInterval(timer))

const targetTime = new Date(newRelease.targetISO).getTime()
const countdown = computed(() => {
  const diff = Math.max(0, targetTime - now.value)
  return {
    released: diff <= 0,
    units: [
      { label: '天', value: Math.floor(diff / 86400000) },
      { label: '时', value: Math.floor(diff / 3600000) % 24 },
      { label: '分', value: Math.floor(diff / 60000) % 60 },
      { label: '秒', value: Math.floor(diff / 1000) % 60 },
    ],
  }
})
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

  <!-- 新歌预告 -->
  <section class="mx-auto max-w-6xl px-6 pt-24">
    <div
      v-reveal
      class="relative overflow-hidden rounded-3xl border border-lilac/25 bg-gradient-to-br from-[#1b1330] via-[#141024] to-[#0b0812] p-10 md:p-14"
    >
      <div class="orb right-[-6%] top-[-30%] h-72 w-72 bg-violet-500/30"></div>
      <div class="noise absolute inset-0"></div>
      <div class="relative md:flex md:items-center md:justify-between md:gap-12">
        <div class="max-w-xl">
          <p class="section-label">New Release · 新歌上线</p>
          <h2 class="mt-4 text-4xl font-black md:text-5xl">
            《<span class="text-gradient-gold">{{ newRelease.title }}</span
            >》
          </h2>
          <p class="mt-3 text-sm tracking-[0.25em] text-lilac">
            {{ newRelease.kind }} · {{ newRelease.date }} 全平台上线
          </p>
          <div class="mt-5 border-l-2 border-lilac/40 pl-5">
            <p class="whitespace-pre-line text-[13px] leading-[1.9] text-cream/65">{{ newRelease.fullIntro }}</p>
          </div>
          <p class="mt-5 text-sm font-bold tracking-wider text-lilac">「{{ newRelease.quote }}」</p>
          <p class="mt-3 text-xs leading-relaxed text-muted/80">
            词曲：G.E.M.邓紫棋 · 制作 / 编曲：李荣浩 · 一个用 AI 建成的应援站，正在等一首关于 AI 时代的歌。
          </p>
          <div class="mt-6 flex gap-4">
            <a
              :href="newRelease.biliUrl"
              target="_blank"
              rel="noopener noreferrer"
              title="前往 B 站观看《自由的你》官方歌词版（4K）"
              class="group relative block w-44 overflow-hidden rounded-xl border border-white/15"
            >
              <img
                :src="newRelease.cover"
                alt="B 站《自由的你》"
                class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>
              <div class="relative flex h-24 flex-col items-center justify-center px-2 text-center">
                <span class="text-sm font-black text-cream drop-shadow">B 站已上线</span>
                <span class="mt-0.5 text-[10px] tracking-widest text-cream/70">去听《自由的你》</span>
              </div>
            </a>
            <a
              :href="newRelease.youtubeUrl"
              target="_blank"
              rel="noopener noreferrer"
              title="前往 YouTube 观看官方歌词版（4K）"
              class="group relative block w-44 overflow-hidden rounded-xl border border-white/15"
            >
              <img
                :src="newRelease.cover"
                alt="YouTube《自由的你》"
                class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>
              <div class="relative flex h-24 flex-col items-center justify-center px-2 text-center">
                <span class="text-sm font-black text-cream drop-shadow">YouTube 已上线</span>
                <span class="mt-0.5 text-[10px] tracking-widest text-cream/70">官方歌词版 · 4K</span>
              </div>
            </a>
          </div>
        </div>
        <div class="mt-10 shrink-0 md:mt-0">
          <template v-if="!countdown.released">
            <div class="flex gap-3">
              <div
                v-for="u in countdown.units"
                :key="u.label"
                class="w-[74px] rounded-2xl border border-white/10 bg-black/30 py-4 text-center"
              >
                <p class="text-gradient-gold text-3xl font-black tabular-nums">
                  {{ String(u.value).padStart(2, '0') }}
                </p>
                <p class="mt-1 text-[10px] tracking-[0.3em] text-muted">{{ u.label }}</p>
              </div>
            </div>
            <p class="mt-4 text-right text-xs tracking-widest text-muted">距离《自由的你》上线</p>
          </template>
          <div v-else class="rounded-2xl border border-gold/40 bg-black/30 px-8 py-6 text-center">
            <p class="text-gradient-gold text-2xl font-black">已全平台上线</p>
            <p class="mt-1 text-xs text-muted">去听听《自由的你》吧</p>
          </div>
        </div>
      </div>
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
      <RouterLink
        v-for="(a, i) in featuredAlbums"
        :key="a.title"
        v-reveal="i * 90"
        :to="`/music#album-${a.idx}`"
        class="card-lift block rounded-2xl"
      >
        <AlbumCover :title="a.title" :year="a.year" :colors="a.colors" :tag="a.type" :cover="a.cover" show-caption />
        <p class="mt-4 line-clamp-2 text-xs leading-relaxed text-muted">{{ a.desc }}</p>
      </RouterLink>
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
