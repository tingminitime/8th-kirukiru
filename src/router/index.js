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

const childrenLayer = [
  {
    path: '',
    // component: () => import('@/views/Index.vue'),
    components: {
      default: () => import('@/views/IndexContent.vue'),
    },
    meta: { requiresAuth: false }
  },
  {
    path: 'page1',
    components: {
      default: () => import('@/views/Page1.vue'),
    },
    meta: { requiresAuth: false }
  },
  {
    path: 'user',
    components: {
      default: () => import('@/views/User.vue'),
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('@/views/UserLogin.vue')
      },
      {
        path: ':uid(\\d+)?',
        name: 'user',
        sensitive: true,
        components: {
          default: () => import('@/views/UserPage.vue'),
        },
        props: {
          default(route) {
            return {
              uid: route.params.uid,
              test: route.query.test,
            }
          }
        },
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'profile',
        components: {
          default: () => import('@/views/Profile.vue'),
        },
        meta: { requiresAuth: true },
        beforeEnter(to, from, next) {
          console.log('to: ', to, 'from: ', from)
          next()
        },
      },
      {
        path: 'posts',
        name: 'posts',
        component: () => import('@/views/Posts.vue'),
        meta: { requiresAuth: false }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: { name: 'NotFound' }
  },
  {
    path: '404',
    name: 'NotFound',
    component: () => import('@/views/Error.vue')
  },
]

const routes = [
  {
    path: '/',
    alias: '/index',
    // component: { render: () => h(RouterView) },
    name: 'HomePage',
    components: {
      default: () => import('@/views/Index.vue'),
    },
    // props: true,
    children: childrenLayer,
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
  console.log(to, from)
  next()
})

export default Router