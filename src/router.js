import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/music', name: 'music', component: () => import('./pages/MusicPage.vue') },
    { path: '/mv', name: 'mv', component: () => import('./pages/MvPage.vue') },
    { path: '/tour', name: 'tour', component: () => import('./pages/TourPage.vue') },
    { path: '/fanclub', name: 'fanclub', component: () => import('./pages/FanClubPage.vue') },
    { path: '/about', name: 'about', component: () => import('./pages/AboutPage.vue') },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 88, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
