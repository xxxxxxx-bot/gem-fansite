<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { mvs, mvSpecial, revelationChapters, spanishChapters } from '../data/mvs.js'

const sortedChapters = [...revelationChapters].sort((a, b) => a.chapter.localeCompare(b.chapter))
const sortedSpanish = [...spanishChapters].sort((a, b) => a.chapter.localeCompare(b.chapter))

const current = ref(null)

function open(mv) {
  current.value = mv
}

function close() {
  current.value = null
}

function openChapter(c) {
  open({ ...c, en: `REVELATION · Chapter ${c.chapter}`, note: '《启示录》MV 连续剧 · 官方投稿' })
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

      <!-- 角标图例 -->
      <div
        v-reveal="280"
        class="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:gap-6"
      >
        <div class="flex items-center gap-3">
          <span class="shrink-0 rounded-full bg-gold/90 px-2.5 py-1 text-[10px] tracking-[0.2em] text-ink">官方投稿</span>
          <p class="text-xs leading-relaxed text-muted">视频由 GEM鄧紫棋 / 邓紫棋工作室官方账号上传，官方原版画质，不会失效。</p>
        </div>
        <div class="hidden h-8 w-px bg-white/10 sm:block"></div>
        <div class="flex items-center gap-3">
          <span class="shrink-0 rounded-full bg-black/50 px-2.5 py-1 text-[10px] tracking-[0.2em] text-cream/80 backdrop-blur">高清搬运</span>
          <p class="text-xs leading-relaxed text-muted">社区修复的高画质版本，非官方上传，存在下架可能。</p>
        </div>
      </div>
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
  </section>

  <!-- 启示录 MV 连续剧 -->
  <section class="border-t border-line">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <p v-reveal class="section-label">The Revelation Series</p>
      <h2 v-reveal="80" class="mt-3 text-2xl font-black md:text-3xl">
        《启示录》MV <span class="text-gradient-lilac">连续剧</span>
      </h2>
      <p v-reveal="160" class="mt-4 max-w-2xl text-sm leading-relaxed text-cream/70">
        2022 年她把整张专辑的 MV 拍成一部 14 章科幻连续剧：Gloria
        从乐土跌入废土，穿越冰河与深海。官方按章投稿了单独版本（第 10/11/13/14 章 B
        站暂无单独投稿，可在全旅程版里看到），想从哪一章看就从哪一章看。
      </p>

      <div class="mt-10">
        <button v-reveal class="group relative block w-full overflow-hidden rounded-3xl border border-white/10 text-left" @click="open(mvSpecial)">
          <img
            :src="mvSpecial.cover"
            alt="《启示录》MV 连续剧全旅程版封面"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/15"></div>
          <div class="relative flex items-center gap-5 p-8 md:px-12">
            <span
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f8e9a0] via-[#e9c46a] to-[#c9963f] text-lg text-[#171102] shadow-[0_8px_30px_rgba(233,196,106,0.35)] transition group-hover:scale-110"
            >
              ▶
            </span>
            <div>
              <span class="rounded-full bg-gold/90 px-2.5 py-1 text-[10px] tracking-[0.2em] text-ink">官方投稿 · 57 分钟</span>
              <h3 class="mt-2.5 text-lg font-black leading-snug">{{ mvSpecial.title }}</h3>
              <p class="mt-1.5 text-xs leading-relaxed text-cream/80">一次看完整部连续剧</p>
            </div>
          </div>
        </button>
      </div>

      <div class="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <button
          v-for="(c, i) in sortedChapters"
          :key="c.bvid"
          v-reveal="(i % 5) * 70"
          class="group text-left"
          @click="openChapter(c)"
        >
          <div class="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-surface transition duration-500 group-hover:-translate-y-1 group-hover:border-lilac/50">
            <img
              :src="c.cover"
              :alt="`《启示录》第${c.chapter}章《${c.title}》封面`"
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25"></div>
            <span
              class="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-sm text-cream backdrop-blur transition group-hover:scale-110 group-hover:bg-lilac group-hover:text-ink"
            >
              ▶
            </span>
            <span class="text-gradient-gold absolute left-3 top-2.5 text-lg font-black drop-shadow">第{{ c.chapter }}章</span>
          </div>
          <p class="mt-2 truncate text-sm font-bold transition group-hover:text-gold">{{ c.title }}</p>
        </button>
      </div>
      <p class="mt-6 text-xs leading-relaxed text-muted/70">
        * 中文版章节按剧情顺序编号；缺少的第十、十一、十三、十四章可在全旅程版中观看对应段落。
      </p>

      <!-- 西语版 -->
      <div class="mt-14">
        <p v-reveal class="section-label">Revelación · 西语版</p>
        <h3 v-reveal="80" class="mt-3 text-xl font-black">
          西语版《Revelación》· <span class="text-gradient-gold">官方投稿</span>
        </h3>
        <p v-reveal="160" class="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          同一个故事的西班牙语版本，官方账号逐集投稿，全 14 集齐全。
        </p>
        <div class="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <button
            v-for="(s, i) in sortedSpanish"
            :key="s.bvid"
            v-reveal="(i % 4) * 70"
            class="group text-left"
            @click="open({ ...s, en: `Revelación · Chapter ${s.chapter}`, note: `西语版 · 对应中文版「${s.zh}」 · 官方投稿` })"
          >
            <div class="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-surface transition duration-500 group-hover:-translate-y-1 group-hover:border-gold/50">
              <img
                :src="s.cover"
                :alt="`《启示录》西语版第${s.chapter}集《${s.title}》封面`"
                loading="lazy"
                class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25"></div>
              <span
                class="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-sm text-cream backdrop-blur transition group-hover:scale-110 group-hover:bg-gold group-hover:text-ink"
              >
                ▶
              </span>
              <span class="text-gradient-gold absolute left-3 top-2.5 text-lg font-black drop-shadow">第{{ s.chapter }}集</span>
            </div>
            <p class="mt-2 truncate text-sm font-bold transition group-hover:text-gold">{{ s.title }}</p>
            <p class="truncate text-xs text-muted">≈ {{ s.zh }}</p>
          </button>
        </div>
        <p class="mt-6 text-xs leading-relaxed text-muted/70">
          * 西语版章节与中文版按同一剧情线编号；括注为对应的中文版曲目。
        </p>
      </div>

      <p class="mt-10 text-xs leading-relaxed text-muted/70">
        * 「高清搬运」的源可能失效，届时会更新；版权归权利方所有，仅作粉丝整理展示。
      </p>
    </div>
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
