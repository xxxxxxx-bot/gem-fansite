<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'

const props = defineProps({
  album: { type: Object, required: true },
  metaList: { type: Array, default: () => [] },
  index: { type: Number, required: true },
})
const emit = defineEmits(['close', 'move'])

const track = computed(() => props.album.tracks[props.index])
const meta = computed(() => props.metaList[props.index] || {})

const audio = ref(null)
const playing = ref(false)
const current = ref(0)
const duration = ref(0)

// 完整版走 Apple 官方内嵌播放器：订阅用户登录后播全曲，未登录自动降级为试听
const showEmbed = ref(false)

function toggleEmbed() {
  showEmbed.value = !showEmbed.value
  if (showEmbed.value) audio.value?.pause()
}

// 歌词：点击时从 LRCLIB 开放接口实时获取，不落站内；看过的缓存到浏览器本地
const LYRICS_CACHE_KEY = 'gem-lyrics-v1'
const lyrics = ref({ status: 'idle', text: '' })
let lyricsReq = 0

function readCache(key) {
  try {
    return JSON.parse(localStorage.getItem(LYRICS_CACHE_KEY) || '{}')[key]
  } catch {
    return undefined
  }
}

function writeCache(key, text) {
  try {
    const all = JSON.parse(localStorage.getItem(LYRICS_CACHE_KEY) || '{}')
    all[key] = text
    localStorage.setItem(LYRICS_CACHE_KEY, JSON.stringify(all))
  } catch {
    // 隐私模式等场景下静默跳过
  }
}

function toSec(d) {
  const [m, s] = d.split(':').map(Number)
  return m * 60 + s
}

async function lrclibSearch(params) {
  const url = `https://lrclib.net/api/search?${new URLSearchParams(params)}`
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 8000)
      const res = await fetch(url, { signal: ctrl.signal })
      clearTimeout(timer)
      if (res.ok) return await res.json()
    } catch {
      // 网络失败或超时走重试
    }
    await new Promise((r) => setTimeout(r, 800))
  }
  return null
}

async function loadLyrics() {
  const reqId = ++lyricsReq
  lyrics.value = { status: 'loading', text: '' }
  const durSec = toSec(track.value.dur)
  const simp = track.value.name
  const trad = meta.value.name || simp
  const cacheKey = `${simp}|${durSec}`
  const cached = readCache(cacheKey)
  if (cached !== undefined) {
    lyrics.value = cached ? { status: 'found', text: cached } : { status: 'none', text: '' }
    return
  }
  const queries = [
    { track_name: simp, artist_name: 'G.E.M.' },
    { track_name: trad, artist_name: 'G.E.M.' },
    { q: `${simp} G.E.M.` },
    { q: `${trad} G.E.M.` },
  ]
  const results = []
  let hadError = false
  for (const qp of queries) {
    const list = await lrclibSearch(qp)
    if (reqId !== lyricsReq) return
    if (list === null) {
      hadError = true
      continue
    }
    if (Array.isArray(list)) results.push(list)
  }
  const artistOk = (r) => /G\.E\.M\.|鄧紫棋|邓紫棋/i.test(r.artistName || '')
  const durOk = (r, tol) =>
    Number.isFinite(r.duration) && Math.abs(r.duration - durSec) <= tol
  let hit = null
  for (const tol of [3, 6]) {
    for (const list of results) {
      hit = hit || list.find((r) => r.plainLyrics && artistOk(r) && durOk(r, tol))
      if (hit) break
    }
    if (hit) break
  }
  if (hit) {
    writeCache(cacheKey, hit.plainLyrics)
    lyrics.value = { status: 'found', text: hit.plainLyrics }
  } else {
    if (!hadError) writeCache(cacheKey, null)
    lyrics.value = { status: hadError ? 'error' : 'none', text: '' }
  }
}

const qqSearch = computed(
  () =>
    'https://y.qq.com/n/ryqq/search?searchtype=0&t=song&w=' +
    encodeURIComponent(`${track.value.name} 邓紫棋`),
)
const neteaseSearch = computed(
  () =>
    'https://music.163.com/#/search/m/?s=' +
    encodeURIComponent(`${track.value.name} 邓紫棋`) +
    '&type=1',
)

const pct = computed(() => (duration.value ? (current.value / duration.value) * 100 : 0))

function fmt(s) {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const ss = Math.floor(s % 60)
  return `${m}:${String(ss).padStart(2, '0')}`
}

function toggle() {
  const a = audio.value
  if (!a) return
  if (playing.value) a.pause()
  else a.play().catch(() => {})
}

function seek(e) {
  const a = audio.value
  if (!a || !duration.value) return
  a.currentTime = Number(e.target.value)
}

watch(
  () => props.index,
  () => {
    current.value = 0
    duration.value = 0
    showEmbed.value = false
    loadLyrics()
    nextTick(() => {
      const a = audio.value
      if (a) a.play().catch(() => {})
    })
  },
)

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  loadLyrics()
  nextTick(() => {
    audio.value?.play().catch(() => {})
  })
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  audio.value?.pause()
})
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      @click.self="emit('close')"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="歌曲试听"
        class="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-surface p-6 shadow-2xl sm:p-7"
      >
        <div class="flex items-start gap-4">
          <img
            :src="album.cover"
            :alt="`《${album.title}》专辑封面`"
            class="h-16 w-16 shrink-0 rounded-xl border border-white/10 object-cover"
          />
          <div class="min-w-0 flex-1">
            <h3 class="truncate text-lg font-black">{{ track.name }}</h3>
            <p class="mt-1 truncate text-xs text-muted">《{{ album.title }}》 · {{ album.year }}</p>
          </div>
          <button
            class="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted transition hover:border-gold hover:text-gold"
            aria-label="关闭"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>

        <template v-if="meta.preview">
          <audio
            ref="audio"
            :src="meta.preview"
            preload="auto"
            @play="playing = true"
            @pause="playing = false"
            @timeupdate="current = $event.target.currentTime"
            @loadedmetadata="duration = $event.target.duration"
            @ended="$event.target.currentTime = 0"
          ></audio>

          <input
            class="seek mt-6 h-1 w-full cursor-pointer rounded-full"
            type="range"
            min="0"
            :max="duration || 0"
            step="0.1"
            :value="current"
            :style="{
              background: `linear-gradient(90deg, #e9c46a ${pct}%, rgba(245,242,234,0.12) ${pct}%)`,
            }"
            :aria-label="`播放进度 ${fmt(current)}`"
            @input="seek"
          />
          <div class="mt-2 flex justify-between text-[11px] tabular-nums text-muted">
            <span>{{ fmt(current) }}</span>
            <span>{{ fmt(duration) }}</span>
          </div>

          <div class="mt-4 flex items-center justify-center gap-6">
            <button
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream transition enabled:hover:border-gold enabled:hover:text-gold disabled:opacity-30"
              :disabled="index === 0"
              aria-label="上一首"
              @click="emit('move', -1)"
            >
              ⏮
            </button>
            <button
              class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f8e9a0] via-[#e9c46a] to-[#c9963f] text-xl text-[#171102] shadow-[0_8px_30px_rgba(233,196,106,0.35)] transition hover:scale-105"
              :aria-label="playing ? '暂停' : '播放'"
              @click="toggle"
            >
              {{ playing ? '❚❚' : '▶' }}
            </button>
            <button
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream transition enabled:hover:border-gold enabled:hover:text-gold disabled:opacity-30"
              :disabled="index === album.tracks.length - 1"
              aria-label="下一首"
              @click="emit('move', 1)"
            >
              ⏭
            </button>
          </div>
        </template>
        <p v-else class="mt-6 rounded-xl border border-white/10 px-4 py-3 text-xs text-muted">
          这首歌暂时没有可用试听，可以去下面的平台收听完整版。
        </p>

        <div
          v-if="lyrics.status === 'loading'"
          class="lyrics-box mt-5 text-muted"
          aria-live="polite"
        >
          歌词加载中…
        </div>
        <div v-else-if="lyrics.status === 'found'" class="lyrics-box mt-5">{{ lyrics.text }}</div>
        <div v-else-if="lyrics.status === 'none'" class="lyrics-box mt-5 text-muted">
          LRCLIB 暂未收录这首歌的歌词，去下方平台查看吧。
        </div>
        <div v-else-if="lyrics.status === 'error'" class="lyrics-box mt-5 text-muted">
          歌词服务暂时不可用，稍后再试或去下方平台查看。
        </div>

        <div v-if="meta.embed" class="mt-5">
          <button
            class="w-full rounded-xl border border-white/10 px-4 py-2.5 text-xs text-cream/80 transition hover:border-gold hover:text-gold"
            @click="toggleEmbed"
          >
            {{ showEmbed ? '收起完整版播放器 ▲' : '完整版播放器（Apple Music）▼' }}
          </button>
          <div v-if="showEmbed" class="mt-3 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              :src="meta.embed"
              height="150"
              loading="lazy"
              allow="autoplay *; encrypted-media *; fullscreen"
              class="block w-full border-0"
              title="Apple Music 完整版播放器"
            ></iframe>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-2">
          <a
            :href="qqSearch"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-xl border border-white/10 px-2 py-2.5 text-center text-xs text-cream/80 transition hover:border-gold hover:text-gold"
            >QQ 音乐 ↗</a
          >
          <a
            :href="neteaseSearch"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-xl border border-white/10 px-2 py-2.5 text-center text-xs text-cream/80 transition hover:border-gold hover:text-gold"
            >网易云 ↗</a
          >
          <a
            v-if="meta.url"
            :href="meta.url"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-xl border border-white/10 px-2 py-2.5 text-center text-xs text-cream/80 transition hover:border-gold hover:text-gold"
            >Apple Music ↗</a
          >
        </div>

        <p class="mt-4 text-[11px] leading-relaxed text-muted/70">
          试听片段来自 Apple Music 官方公开预览；展开完整版播放器并登录 Apple Music 账号可听全曲，未登录自动降级为官方试听。歌词由 LRCLIB 开放接口实时获取，版权归原作者所有，仅作粉丝学习欣赏用途。
        </p>
      </div>
    </div>
  </Teleport>
</template>
