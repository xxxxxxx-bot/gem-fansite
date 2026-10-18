<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { vlogFilters, vlogs } from '../data/vlogs.js'

const active = ref('全部')
const current = ref(null)

const sorted = computed(() => [...vlogs].sort((a, b) => b.date.localeCompare(a.date)))
const featured = computed(() => (active.value === '全部' ? sorted.value[0] : null))
const list = computed(() =>
  featured.value ? sorted.value.slice(1) : sorted.value.filter((v) => v.group === active.value),
)

function open(v) {
  current.value = v
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
  <section class="relative overflow-hidden pb-14 pt-36">
    <div class="orb left-[-8%] top-[-12%] h-96 w-96 bg-violet-600/30"></div>
    <div class="orb right-[-6%] bottom-[-30%] h-80 w-80 bg-amber-400/15" style="animation-delay: -5s"></div>
    <div class="noise absolute inset-0"></div>
    <div class="relative mx-auto max-w-6xl px-6">
      <p v-reveal class="section-label">Video Log</p>
      <h1 v-reveal="100" class="mt-4 text-4xl font-black md:text-6xl">
        GEM<span class="text-gradient-lilac">VLOG</span>
      </h1>
      <p v-reveal="200" class="mt-6 max-w-2xl text-sm leading-relaxed text-cream/70">
        邓紫棋官方账号与工作室拍摄的 VLOG——巡演路上、旅行日常、开箱与幕后记录。共
        {{ vlogs.length }} 支，按发布时间倒序。
      </p>

      <div v-reveal="280" class="mt-8 flex flex-wrap gap-2">
        <button
          v-for="f in vlogFilters"
          :key="f"
          class="rounded-full px-4 py-2 text-xs tracking-[0.12em] transition"
          :class="
            active === f
              ? 'bg-gold font-bold text-ink'
              : 'border border-white/15 text-cream/70 hover:border-gold/50 hover:text-gold'
          "
          @click="active = f"
        >
          {{ f }}
        </button>
      </div>
    </div>
  </section>

  <section v-if="featured" class="mx-auto max-w-6xl px-6 pb-12">
    <button
      v-reveal
      class="group relative block min-h-[360px] w-full overflow-hidden rounded-3xl border border-white/10 text-left md:min-h-[440px]"
      @click="open(featured)"
    >
      <img
        :src="featured.cover"
        :alt="featured.title"
        class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5"></div>
      <span
        class="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-cream backdrop-blur transition group-hover:bg-gold group-hover:text-ink"
      >
        ▶
      </span>
      <div class="absolute inset-x-0 bottom-0 p-8 md:p-12">
        <span class="rounded-full bg-gold px-3 py-1 text-[10px] font-black tracking-[0.2em] text-ink">最新 VLOG</span>
        <h2 class="mt-4 text-3xl font-black md:text-5xl">{{ featured.title }}</h2>
        <p class="mt-2 text-sm text-cream/75">
          {{ featured.series }} · {{ featured.date }} · {{ featured.duration }}
        </p>
      </div>
    </button>
  </section>

  <section class="mx-auto max-w-6xl px-6 pb-24">
    <div class="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      <button
        v-for="(v, i) in list"
        :key="v.bvid"
        v-reveal="(i % 3) * 80"
        class="group text-left"
        @click="open(v)"
      >
        <div
          class="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-surface transition duration-500 group-hover:-translate-y-1.5 group-hover:border-gold/40"
        >
          <img
            :src="v.cover"
            :alt="v.title"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20"></div>
          <span
            class="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] tracking-[0.16em] text-cream/85 backdrop-blur"
          >
            {{ v.group }}
          </span>
          <span
            class="absolute bottom-3 right-3 rounded bg-black/65 px-2 py-0.5 font-mono text-[10px] tabular-nums text-cream/85"
          >
            {{ v.duration }}
          </span>
          <span class="absolute bottom-3 left-3 font-mono text-[11px] tabular-nums text-cream/75">
            {{ v.date.slice(0, 4) }}
          </span>
          <span
            class="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-cream backdrop-blur transition group-hover:scale-110 group-hover:bg-gold group-hover:text-ink"
          >
            ▶
          </span>
        </div>
        <p class="mt-3 font-bold transition group-hover:text-gold">{{ v.title }}</p>
        <p class="mt-1 text-xs leading-relaxed text-muted">{{ v.series }}</p>
      </button>
    </div>

    <p v-if="!list.length" class="py-20 text-center text-sm text-muted">这个分类还没有 VLOG。</p>
  </section>

  <Teleport to="body">
    <div
      v-if="current"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      @click.self="close"
    >
      <div class="w-full max-w-3xl" role="dialog" aria-modal="true" aria-label="VLOG 播放">
        <div class="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
          <iframe
            :src="`https://player.bilibili.com/player.html?bvid=${current.bvid}&autoplay=0&high_quality=1&danmaku=0`"
            class="h-full w-full"
            scrolling="no"
            frameborder="0"
            allowfullscreen
            :title="current.title"
          ></iframe>
        </div>
        <div class="mt-4 flex items-start justify-between gap-4">
          <div class="min-w-0">
            <h3 class="truncate text-lg font-black">{{ current.title }}</h3>
            <p class="mt-1 text-xs text-muted">
              {{ current.series }} · {{ current.date }} · {{ current.duration }}
            </p>
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
