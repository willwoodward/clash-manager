import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClanWarView from '../views/ClanWarView.vue'
import JacobView from '../views/JacobView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/members',
      name: 'members',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MembersView.vue')
    },
    {
      path: '/clanwars',
      name: 'clanwars',
      component: ClanWarView
    },
    {
      path: '/jacob',
      name: 'jacob',
      component: JacobView
    }
  ]
})

export default router
