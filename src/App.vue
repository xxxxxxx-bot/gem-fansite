<script setup>
import { Analytics } from '@vercel/analytics/vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div class="min-h-screen">
    <NavBar />
    <main>
      <router-view />
    </main>
    <FooterBar />
    <Analytics />
  </div>
</template>
