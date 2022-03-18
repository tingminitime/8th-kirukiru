// import { h } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory, RouterView } from 'vue-router'
import store from '@/store/index.js'
import NProgress from 'nprogress'
import '@/assets/css/nprogress.css'

// --- NProgress ---
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickle: false,
})

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
    meta: { requiresAuth: false, navbar: true },
    children: [
      {
        path: 'login',
        name: 'SignIn',
        components: {
          default: () => import('@/views/SignIn.vue'),
        },
        meta: { requiresAuth: false, navbar: true },
      },
      {
        path: 'signup',
        name: 'SignUp',
        components: {
          default: () => import('@/views/SignUp.vue')
        },
        meta: { requiresAuth: false, navbar: true },
      },
      {
        path: 'editor-mode',
        name: 'EditorMode',
        components: {
          default: () => import('@/views/EditModel/EditorMode.vue')
        },
        meta: { requiresAuth: false, navbar: true },
      },
      {
        path: 'editor',
        name: 'Editor',
        components: {
          default: () => import('@/views/EditModel/EditorPage.vue')
        },
        meta: { requiresAuth: true, navbar: false },
        children: [
          {
            path: 'kiru',
            name: 'EditKiru',
            components: {
              default: () => import('@/views/EditModel/EditKiru.vue')
            },
            meta: { requiresAuth: true, navbar: false },
          },
          {
            path: 'normal',
            name: 'EditNormal',
            components: {
              default: () => import('@/views/EditModel/EditNormal.vue')
            },
            meta: { requiresAuth: true, navbar: false },
          },
        ]
      },
      {
        path: '/:pathMatch(.*)',
        redirect: { name: 'NotFound', query: { status: 404 } }
      },
      {
        path: 'error',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: { error: 404, navbar: true }
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
  NProgress.start()
  console.log('trigger beforeEach!')
  // console.log(to, from)
  next()
})

Router.afterEach((to, from) => {
  NProgress.done()
})

export default Router