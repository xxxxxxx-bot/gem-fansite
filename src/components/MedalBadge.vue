<template>
  <div class="relative h-52 w-52">
    <!-- 绶带 -->
    <div class="absolute -top-9 left-1/2 flex -translate-x-1/2 gap-1.5">
      <div class="h-24 w-8 -rotate-[14deg] rounded-b-md bg-gradient-to-b from-violet-400 to-violet-700 opacity-90"></div>
      <div class="h-24 w-8 rotate-[14deg] rounded-b-md bg-gradient-to-b from-amber-300 to-yellow-600 opacity-90"></div>
    </div>
    <!-- 勋章 -->
    <div
      class="absolute inset-0 rounded-full bg-gradient-to-br from-[#f8e9a0] via-[#e9c46a] to-[#a8772a] shadow-[0_0_90px_rgba(233,196,106,0.35)]"
    ></div>
    <div class="absolute inset-[11px] flex flex-col items-center justify-center gap-1.5 rounded-full bg-[#141020]">
      <span class="text-gradient-gold text-4xl font-black tracking-[0.15em]">棋士</span>
      <span class="text-[9px] tracking-[0.42em] text-cream/45">FAN CLUB · G.E.M.</span>
    </div>
  </div>
</template>
