// import { h } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory, RouterView } from 'vue-router'
import store from '@/store/index.js'

const scrollBehavior = (to, from, savedPosition) => {
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    }
  } else {
    return { top: 0 }
  }
}


const routes = [
  {
    path: '/',
    alias: '/index',
    // component: { render: () => h(RouterView) },
    name: 'HomePage',
    components: {
      default: () => import('@/views/HomePage.vue'),
    },
    meta: { requiresAuth: false },
    children: [
      {
        path: '/:pathMatch(.*)',
        redirect: { name: 'NotFound', query: { status: 404 } }
      },
      {
        path: 'error',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue')
      },
    ],
  },
]

const Router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
  scrollBehavior,
})

Router.beforeEach((to, from, next) => {
  console.log('trigger beforeEach!')
  // console.log(to, from)
  next()
})

export default Router