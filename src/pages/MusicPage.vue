<script setup>
import { ref } from 'vue'
import AlbumCover from '../components/AlbumCover.vue'
import TrackPlayer from '../components/TrackPlayer.vue'
import { albums, songs } from '../data/site.js'
import { trackMeta } from '../data/tracks-meta.js'

const player = ref(null)

function openTrack(album, index) {
  player.value = { album, index }
}

function moveTrack(delta) {
  if (!player.value) return
  const len = player.value.album.tracks.length
  const next = player.value.index + delta
  if (next >= 0 && next < len) player.value = { ...player.value, index: next }
}
</script>

<template>
  <section class="relative overflow-hidden pb-16 pt-36">
    <div class="orb left-[-10%] top-[-20%] h-96 w-96 bg-violet-600/30"></div>
    <div class="noise absolute inset-0"></div>
    <div class="relative mx-auto max-w-6xl px-6">
      <p v-reveal class="section-label">Discography</p>
      <h1 v-reveal="100" class="mt-4 text-4xl font-black md:text-6xl">
        音乐<span class="text-gradient-gold">年表</span>
      </h1>
      <p v-reveal="200" class="mt-5 max-w-2xl text-sm leading-relaxed text-cream/70">
        从 2008 年 16 岁出道，到 2022
        年的科幻概念专辑——一张出道 EP 加六张录音室专辑，串起她的音乐成长轨迹。点开任意专辑可查看完整曲目单。
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 pb-24">
    <div class="relative">
      <div
        class="absolute bottom-0 left-[7.5px] top-0 w-px bg-gradient-to-b from-violet-400/60 via-gold/40 to-transparent md:left-1/2"
      ></div>

      <article
        v-for="(a, i) in albums"
        :id="`album-${i}`"
        :key="a.title"
        class="relative py-10 md:grid md:grid-cols-2 md:gap-20"
      >
        <span
          class="absolute left-0 top-12 h-4 w-4 rounded-full border-2 border-gold bg-ink md:left-1/2 md:-translate-x-1/2"
        ></span>

        <div v-reveal :class="i % 2 === 0 ? 'md:pr-4' : 'md:order-2 md:pl-4'">
          <div class="max-w-xs">
            <AlbumCover :title="a.title" :year="a.year" :colors="a.colors" :tag="a.type" :cover="a.cover" />
          </div>
        </div>
        <div
          v-reveal="120"
          :class="[
            'flex flex-col justify-center',
            i % 2 === 0 ? 'md:pl-4' : 'md:order-1 md:items-end md:pr-4 md:text-right',
          ]"
        >
          <p class="text-gradient-gold text-4xl font-black">{{ a.year }}</p>
          <h3 class="mt-2 text-2xl font-black">{{ a.title }}</h3>
          <p class="mt-1 text-xs tracking-[0.3em] text-muted">{{ a.type }}</p>
          <p class="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">{{ a.desc }}</p>
          <details v-if="a.tracks" class="tracklist mt-6 w-full">
            <summary>
              <span class="tracklist-label">Tracklist</span>
              <span class="tracklist-count">共 {{ a.tracks.length }} 首</span>
              <svg
                class="tracklist-chevron"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M3.5 6l4.5 4.5L12.5 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </summary>
            <ol>
              <li v-for="(t, n) in a.tracks" :key="t.name">
                <button
                  class="track-row"
                  :title="`试听《${t.name}》`"
                  @click="openTrack(a, n)"
                >
                  <span class="t-num">
                    {{ String(n + 1).padStart(2, '0') }}
                    <span class="t-play" aria-hidden="true">▶</span>
                  </span>
                  <span class="t-name">{{ t.name }}</span>
                  <span class="t-dots"></span>
                  <span class="t-dur">{{ t.dur }}</span>
                </button>
              </li>
            </ol>
          </details>
        </div>
      </article>
    </div>
  </section>

  <section class="border-t border-line">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <p v-reveal class="section-label">Signature Songs</p>
      <h2 v-reveal="80" class="mt-3 text-3xl font-black md:text-4xl">代表作品</h2>
      <div class="mt-10 flex flex-wrap gap-3">
        <span v-for="(s, i) in songs" :key="s" v-reveal="i * 50" class="song-chip">{{ s }}</span>
      </div>
      <p class="mt-10 text-xs text-muted/70">* 歌曲与专辑信息整理自公开资料，仅作粉丝整理展示。</p>
    </div>
  </section>


  <TrackPlayer
    v-if="player"
    :album="player.album"
    :meta-list="trackMeta[player.album.title] || []"
    :index="player.index"
    @close="player = null"
    @move="moveTrack"
  />
</template>
