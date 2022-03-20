// import { h } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory, RouterView } from 'vue-router'
import store from '@/store/index.js'
import NProgress from 'nprogress'
import '@/assets/css/nprogress.css'
import { notify } from 'notiwind'
import { getUserInfo } from '@api'

// --- NProgress ---
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickle: false,
})

const routes = [
  {
    path: '/',
    alias: '/index',
    // component: { render: () => h(RouterView) },
    name: 'HomePage',
    components: {
      default: () => import('@/views/HomePage.vue'),
    },
    meta: { requiresAuth: false, navbar: true, recordPath: true },
    children: [
      // 登入頁面
      {
        path: 'signin',
        name: 'SignIn',
        components: {
          default: () => import('@/views/SignIn.vue'),
        },
        meta: { requiresAuth: false, navbar: true, recordPath: true },
        beforeEnter(to, from, next) {
          console.log(to, from)
          store.commit(
            'SET_RECORD_PATH',
            from.meta.recordPath ? from.name : 'HomePage'
          )
          next()
        }
      },
      // 註冊頁面
      {
        path: 'signup',
        name: 'SignUp',
        components: {
          default: () => import('@/views/SignUp.vue')
        },
        meta: { requiresAuth: false, navbar: true, recordPath: false },
      },
      {
        path: 'editor',
        name: 'EditPage',
        components: {
          default: () => import('@/views/EditModel/EditPage.vue')
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
      // 404 Not Found
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

const Router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
  scrollBehavior,
})

Router.beforeEach((to, from, next) => {
  console.log('trigger beforeEach!', to, from)
  NProgress.start()

  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('kirukiruToken')
    if (token) {
      getUserInfo(token).then(res => {
        console.log('編輯模式驗證登入狀態: ', res)
        if (res.data) {
          next()
        } else {
          next({ name: 'SignIn' })
        }
      })
      .catch(error => {
        this.$notify({
          group: "error",
          title: "Error",
          text: `${error}`
        }, 2500) 
        next({ name: 'HomePage' })
      })
    } else {
      next({ name: 'SignIn' })
    }
  } else {
    next()
  }
})

Router.afterEach((to, from) => {
  NProgress.done()
})

export default Router