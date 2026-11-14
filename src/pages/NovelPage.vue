<script setup>
import { book, newBook } from '../data/site.js'
</script>

<template>
  <section class="relative overflow-hidden pb-16 pt-36">
    <div class="orb right-[-8%] top-[-10%] h-[420px] w-[420px] bg-violet-600/30"></div>
    <div class="orb left-[-6%] bottom-[-20%] h-80 w-80 bg-amber-400/15" style="animation-delay: -6s"></div>
    <div class="noise absolute inset-0"></div>
    <div class="relative mx-auto max-w-6xl px-6">
      <p v-reveal class="section-label">Novels</p>
      <h1 v-reveal="100" class="mt-4 text-4xl font-black md:text-6xl">
        小说<span class="text-gradient-gold">馆</span>
      </h1>
      <p v-reveal="200" class="mt-6 max-w-2xl text-sm leading-relaxed text-cream/70">
        从音乐到文字——两部长篇科幻小说，同一个宇宙的两次启程。第一本已出版上市，第二本正在番茄小说连载。
      </p>
    </div>
  </section>

  <!-- 第一部 · 启示路 -->
  <section class="mx-auto max-w-6xl px-6 pb-24">
    <div class="grid items-center gap-12 md:grid-cols-[380px_1fr]">
      <div v-reveal class="mx-auto w-full max-w-sm -rotate-1 transition duration-500 hover:rotate-0">
        <div
          class="relative aspect-square overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
          style="
            background:
              radial-gradient(130% 100% at 80% 0%, #7c3aed 0%, transparent 55%),
              radial-gradient(120% 110% at 20% 100%, #be123c 0%, transparent 58%),
              #0d0a18;
          "
        >
          <img
            src="/covers/qishilu-book.jpg"
            alt="《启示路》恒藏版书籍封面"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div>
        <p v-reveal class="section-label">Novel 01 · 已出版</p>
        <h2 v-reveal="80" class="mt-3 text-3xl font-black md:text-4xl">
          科幻小说<span class="text-gradient-gold">《{{ book.title }}》</span>
        </h2>
        <p v-reveal="140" class="mt-1 text-sm tracking-[0.2em] text-muted">{{ book.kind }}</p>
        <p v-reveal="200" class="mt-5 max-w-2xl text-sm leading-relaxed text-cream/70">{{ book.desc }}</p>
        <ul class="mt-7 grid gap-3 sm:grid-cols-2">
          <li
            v-for="f in book.facts"
            :key="f.label"
            v-reveal
            class="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
          >
            <p class="text-xs tracking-[0.3em] text-gold">{{ f.label }}</p>
            <p class="mt-1.5 text-[13px] leading-relaxed text-cream/80">{{ f.text }}</p>
          </li>
        </ul>
        <p class="mt-6 text-xs leading-relaxed text-muted/70">
          * 出版信息整理自公开报道；封面为官方宣传物料，版权归出版方所有，仅作粉丝展示。
        </p>
      </div>
    </div>
  </section>

  <!-- 第二部 · 自由的你 -->
  <section class="border-t border-line">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <div class="grid items-center gap-12 md:grid-cols-[1fr_380px]">
        <div class="order-2 md:order-1">
          <p v-reveal class="section-label">Novel 02 · 连载中</p>
          <h2 v-reveal="80" class="mt-3 text-3xl font-black md:text-4xl">
            科幻小说<span class="text-gradient-gold">《{{ newBook.title }}》</span>
          </h2>
          <p v-reveal="140" class="mt-1 text-sm tracking-[0.2em] text-muted">{{ newBook.kind }}</p>
          <p v-reveal="200" class="mt-5 max-w-2xl text-sm leading-relaxed text-cream/70">{{ newBook.desc }}</p>
          <ul class="mt-7 grid gap-3 sm:grid-cols-2">
            <li
              v-for="f in newBook.facts"
              :key="f.label"
              v-reveal
              class="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
            >
              <p class="text-xs tracking-[0.3em] text-gold">{{ f.label }}</p>
              <p class="mt-1.5 text-[13px] leading-relaxed text-cream/80">{{ f.text }}</p>
            </li>
          </ul>
          <p class="mt-6 text-xs leading-relaxed text-muted/70">
            * 连载信息整理自官方官宣与公开报道，仅作粉丝展示；小说版权归邓紫棋女士所有。
          </p>
        </div>
        <div v-reveal class="order-1 mx-auto w-full max-w-sm rotate-1 transition duration-500 hover:rotate-0 md:order-2">
          <div
            class="relative aspect-square overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
            style="
              background:
                radial-gradient(120% 90% at 70% 10%, #1e3a8a 0%, transparent 50%),
                radial-gradient(130% 100% at 20% 95%, #7c3aed 0%, transparent 55%),
                radial-gradient(60% 45% at 78% 78%, rgba(190, 18, 60, 0.55) 0%, transparent 70%),
                #06040f;
            "
          >
            <!-- 星点 -->
            <span class="absolute left-[18%] top-[14%] h-1 w-1 rounded-full bg-white/70"></span>
            <span class="absolute left-[70%] top-[8%] h-0.5 w-0.5 rounded-full bg-white/50"></span>
            <span class="absolute left-[85%] top-[30%] h-1 w-1 rounded-full bg-white/60"></span>
            <span class="absolute left-[10%] top-[55%] h-0.5 w-0.5 rounded-full bg-white/50"></span>
            <span class="absolute left-[26%] top-[78%] h-1 w-1 rounded-full bg-white/40"></span>
            <span class="absolute left-[62%] top-[88%] h-0.5 w-0.5 rounded-full bg-white/60"></span>
            <!-- 2 号地球 -->
            <div class="absolute right-[12%] top-[16%] h-20 w-20 rounded-full border border-violet-300/30" style="background: radial-gradient(circle at 35% 30%, #a78bfa 0%, #6d28d9 45%, #1e1b4b 100%); box-shadow: 0 0 40px rgba(139, 92, 246, 0.35)"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <p class="text-[11px] tracking-[0.5em] text-cream/60">PLANET NO.2</p>
              <p class="text-gradient-gold mt-4 text-5xl font-black">自由的你</p>
              <p class="mt-5 text-xs tracking-[0.4em] text-cream/70">欢迎来到 2 号地球</p>
              <p class="mt-6 rounded-full border border-white/10 px-4 py-1.5 text-[10px] tracking-[0.25em] text-muted">2026.11.06 · 番茄小说连载中</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
