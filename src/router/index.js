// import { h } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory, RouterView } from 'vue-router'
import store from '@/store/index.js'

const childrenLayer = [
  {
    path: '',
    // component: () => import('@/views/Index.vue'),
    components: {
      default: () => import('@/views/IndexContent.vue'),
    },
  },
  {
    path: 'page1',
    components: {
      default: () => import('@/views/Page1.vue'),
    }
  },
  {
    path: 'user',
    components: {
      default: () => import('@/views/User.vue'),
    },
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
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: 'posts',
        name: 'posts',
        component: () => import('@/views/Posts.vue')
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
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
})

export default Router