<script setup>
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
  </div>
</template>
