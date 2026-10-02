<script setup>
import { useRoute } from 'vue-router'
import { socials } from '../data/socials.js'

const route = useRoute()
const links = [
  { to: '/', label: '首页' },
  { to: '/music', label: '音乐' },
  { to: '/mv', label: 'MV' },
  { to: '/tour', label: '巡演' },
  { to: '/fanclub', label: '棋士联盟' },
  { to: '/about', label: '关于' },
]
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line">
    <div class="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
      <div>
        <p class="text-gradient-gold text-2xl font-black tracking-[0.18em]">G.E.M.</p>
        <p class="mt-2 text-sm text-cream/70">邓紫棋 · 粉丝致敬站</p>
        <p class="mt-6 text-[11px] tracking-[0.45em] text-muted">GET EVERYBODY MOVING</p>
      </div>

      <div>
        <p class="section-label mb-5">站内导航</p>
        <ul class="grid grid-cols-2 gap-x-6 gap-y-3">
          <li v-for="l in links" :key="l.to">
            <RouterLink
              :to="l.to"
              class="text-sm transition hover:text-gold"
              :class="route.path === l.to ? 'text-gold' : 'text-cream/70'"
              >{{ l.label }}</RouterLink
            >
          </li>
        </ul>
      </div>

      <div>
        <p class="section-label mb-5">官方渠道</p>
        <ul class="flex flex-col gap-3">
          <li>
            <a
              href="https://www.iamgem.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-cream/70 transition hover:text-gold"
              >G.E.M. 官方网站 ↗</a
            >
          </li>
          <li>
            <a
              href="https://www.iamgem.com/fan-club"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-cream/70 transition hover:text-gold"
              >官方棋士联盟 Fan Club ↗</a
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- 社交媒体直达 -->
    <div class="border-t border-line px-6 py-10">
      <div class="mx-auto max-w-6xl text-center">
        <p class="section-label">Follow G.E.M.</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <a
            v-for="s in socials"
            :key="s.name"
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            class="song-chip flex items-center gap-1.5 !text-[13px]"
          >
            <svg class="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path :d="s.path" />
            </svg>
            <span>{{ s.name }}</span>
            <span class="opacity-50">↗</span>
          </a>
        </div>
        <p class="mt-5 text-xs text-muted/70">* 社媒账号整理自 G.E.M. 官方网站页脚链接。</p>
      </div>
    </div>

    <div class="border-t border-line px-6 py-6">
      <p class="mx-auto max-w-6xl text-xs leading-relaxed text-muted/80">
        © {{ year }} GEM FANSITE · 本站为粉丝自制致敬网站，非官方网站，与邓紫棋女士及其官方团队无关。内容整理自公开资料；专辑封面图片版权归邓紫棋女士及相关唱片公司所有，仅作粉丝非商业展示用途，如有侵权请联系删除。
      </p>
    </div>
  </footer>
</template>
