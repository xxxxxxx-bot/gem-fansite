<script setup>
defineProps({
  title: { type: String, required: true },
  year: { type: String, required: true },
  colors: { type: Array, default: () => ['#7c3aed', '#2563eb'] },
  tag: { type: String, default: 'ALBUM' },
  cover: { type: String, default: '' },
  showCaption: { type: Boolean, default: false },
})
</script>

<template>
  <figure>
    <div
      class="relative aspect-square overflow-hidden rounded-2xl border border-white/10"
      :style="{
        background: `radial-gradient(120% 120% at 18% 12%, ${colors[0]} 0%, transparent 55%), radial-gradient(130% 130% at 85% 88%, ${colors[1]} 0%, transparent 58%), #12101c`,
      }"
    >
      <img
        v-if="cover"
        :src="cover"
        :alt="`《${title}》专辑封面`"
        loading="lazy"
        class="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out hover:scale-[1.04]"
      />

      <!-- 无封面时的自绘唱片 -->
      <template v-else>
        <div class="noise absolute inset-0"></div>

        <div class="absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"></div>
        <div class="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"></div>
        <div class="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25"></div>

        <div
          class="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-40 blur-2xl"
          :style="{ background: colors[0] }"
        ></div>
        <div
          class="absolute -bottom-10 -left-10 h-36 w-36 rounded-full opacity-30 blur-2xl"
          :style="{ background: colors[1] }"
        ></div>

        <div class="absolute inset-0 flex flex-col justify-between p-5">
          <div class="flex items-center justify-between text-[10px] tracking-[0.35em] text-cream/60">
            <span>{{ tag }}</span>
            <span>{{ year }}</span>
          </div>
          <h3 class="text-2xl font-black leading-tight text-cream drop-shadow-lg">
            {{ title }}
          </h3>
        </div>
      </template>
    </div>
    <figcaption v-if="showCaption" class="mt-3 flex items-baseline justify-between gap-2 px-0.5">
      <span class="truncate text-sm font-bold text-cream">{{ title }}</span>
      <span class="shrink-0 text-[11px] tracking-[0.25em] text-muted">{{ year }}</span>
    </figcaption>
  </figure>
</template>
