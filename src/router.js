import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/music', name: 'music', component: () => import('./pages/MusicPage.vue') },
    { path: '/tour', name: 'tour', component: () => import('./pages/TourPage.vue') },
    { path: '/fanclub', name: 'fanclub', component: () => import('./pages/FanClubPage.vue') },
    { path: '/about', name: 'about', component: () => import('./pages/AboutPage.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
