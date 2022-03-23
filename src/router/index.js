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
      // 文章新增 / 編輯
      {
        path: 'editor',
        name: 'EditPage',
        components: {
          default: () => import('@/views/EditModel/EditPage.vue')
        },
        meta: { requiresAuth: true, navbar: false, recordPath: false },
        children: [
          {
            path: 'kiru/:article(\\d+)?',
            name: 'EditKiru',
            components: {
              default: () => import('@/views/EditModel/EditKiru.vue')
            },
            meta: { requiresAuth: true, navbar: false },
            props: {
              default(route) {
                return {
                  articleId: route.params.article
                }
              }
            },
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
      // 文章頁面
      {
        path: 'article',
        name: 'Article',
        components: {
          default: () => import('@/views/Article/ArticlePage.vue')
        },
        meta: { requiresAuth: false, navbar: true },
        children: [
          {
            path: ':articleId',
            name: 'ArticleContent',
            components: {
              default: () => import('@/views/Article/ArticleKiru.vue')
            },
          }
        ],
      },
      // 作者個人頁面
      {
        path: 'author/:authorId',
        name: 'Author',
        components: {
          default: () => import('@/views/Author/AuthorPage.vue'),
          subscribed: () => import('@/views/Author/AuthorSubscribed.vue'),
        },
        meta: { requiresAuth: false, navbar: true },
      },
      // 使用者個人頁面
      {
        path: 'user/:userId',
        name: 'User',
        components: {
          default: () => import('@/views/User/UserPage.vue'),
          info: () => import('@/views/User/UserInfo.vue'),
          profile: () => import('@/views/User/UserProfile.vue'),
          articles: () => import('@/views/User/UserArticles.vue'),
          collections: () => import('@/views/User/UserCollections.vue'),
          plan: () => import('@/views/User/UserPlan.vue'),
          subscriptions: () => import('@/views/User/UserSubscriptions.vue'),
        },
        meta: { requiresAuth: true, navbar: true },
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
      top: 100,
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
  // 進度條開始
  NProgress.start()

  // 判斷記錄導頁前路徑
  if (from.name !== store.state.recordPath) {
    store.commit(
      'SET_RECORD_PATH',
      from.meta.recordPath ? from.name : 'HomePage'
    )
  }

  // 判斷是否驗證導頁
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('kirukiruToken')
    if (token) {
      getUserInfo(token).then(res => {
        console.log('頁面要求驗證登入狀態: ', res)
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
  // 進度條結束
  NProgress.done()
})

export default Router