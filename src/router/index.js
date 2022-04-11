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
    redirect: { name: 'LandingPage' },
    components: {
      default: () => import('@/views/HomePage.vue'),
    },
    meta: { requiresAuth: false, navbar: true, recordPath: true },
    children: [
      // 首頁
      {
        path: 'home',
        alias: 'index',
        name: 'LandingPage',
        components: {
          default: () => import('@/views/Home/LandingPage.vue'),
        },
        meta: { requiresAuth: false, navbar: true, recordPath: true },
      },
      // 登入頁面
      {
        path: 'signin',
        name: 'SignIn',
        components: {
          default: () => import('@/views/Sign/SignIn.vue'),
        },
        meta: { requiresAuth: false, navbar: true, recordPath: true },
      },
      // 註冊頁面
      {
        path: 'signup',
        name: 'SignUp',
        components: {
          default: () => import('@/views/Sign/SignUp.vue')
        },
        meta: { requiresAuth: false, navbar: true, recordPath: false },
      },
      // 註冊完成頁面
      {
        path: 'signup/complete',
        name: 'SignUpComplete',
        components: {
          default: () => import('@/views/Sign/SignUpComplete.vue')
        },
        meta: { requiresAuth: false, navbar: true, recordPath: false },
      },
      // 忘記密碼頁面
      {
        path: 'forgot',
        name: 'ForgotPassword',
        components: {
          default: () => import('@/views/Sign/ForgotPassword.vue')
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
            path: 'common/:article(\\d+)?',
            name: 'EditNormal',
            components: {
              default: () => import('@/views/EditModel/EditNormal.vue')
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
            path: 'kiru/:articleId',
            name: 'ArticleKiru',
            components: {
              default: () => import('@/views/Article/ArticleKiru.vue')
            },
            meta: { requiresAuth: false, navbar: true, recordPath: true, articleType: 'kiru' },
            props: {
              default(route) {
                return {
                  articleId: route.params.articleId,
                }
              },
            },
          },
          {
            path: 'common/:articleId',
            name: 'ArticleCommon',
            components: {
              default: () => import('@/views/Article/ArticleCommon.vue')
            },
            meta: { requiresAuth: false, navbar: true, recordPath: true, articleType: 'common' },
            props: {
              default(route) {
                return {
                  articleId: route.params.articleId,
                }
              },
            },
          },
        ],
      },
      // 分類頁面
      {
        path: 'category',
        name: 'Category',
        components: {
          default: () => import('@/views/Category/CategoryPage.vue')
        },
        meta: { requiresAuth: false, navbar: true, recordPath: true },
        props: {
          default(route) {
            return {
              searchType: route.params.searchType,
            }
          },
        },
        children: [
          {
            path: ':searchType',
            name: 'CategoryContent',
            components: {
              kiru: () => import('@/views/Category/CategoryKiru.vue'),
              common: () => import('@/views/Category/CategoryCommon.vue'),
            },
            meta: { requiresAuth: false, navbar: true, recordPath: true },
            props: {
              kiru(route) {
                return {
                  categoryId: Number(route.query.categoryId)
                }
              },
              common(route) {
                return {
                  categoryId: Number(route.query.categoryId)
                }
              },
            },
          },
        ],
      },
      // 搜尋頁面
      {
        path: 'search',
        name: 'Search',
        components: {
          default: () => import('@/views/Search/SearchPage.vue'),
        },
        meta: { requiresAuth: false, navbar: true, recordPath: true },
        props: {
          default(route) {
            return {
              searchType: route.params.searchType,
              keywords: route.query.keywords,
            }
          },
        },
        children: [
          {
            path: ':searchType',
            name: 'SearchContent',
            components: {
              kiru: () => import('@/views/Search/SearchKiru.vue'),
              common: () => import('@/views/Search/SearchCommon.vue'),
            },
            meta: { requiresAuth: false, navbar: true, recordPath: true },
          },
        ],
      },
      // 作者個人頁面
      {
        path: 'author',
        name: 'Author',
        components: {
          default: () => import('@/views/Author/AuthorPage.vue'),
        },
        meta: { requiresAuth: false, navbar: true, recordPath: true },
        props: {
          default(route) {
            return {
              authorId: route.params.authorId,
            }
          }
        },
        children: [
          {
            path: ':authorId?',
            name: 'AuthorDetail',
            components: {
              default: () => import('@/views/Author/AuthorSubscribe.vue'),
            },
            meta: { requiresAuth: false, navbar: true, recordPath: true },
          }
        ],
      },
      // 訂閱頁面
      {
        path: 'subscribe/:authorId',
        name: 'Subscribe',
        components: {
          default: () => import('@/views/Subscribe/SubscribePage.vue'),
        },
        meta: { requiresAuth: true, navbar: true, recordPath: true, signOutBackToHome: true },
        props: {
          default(route) {
            return {
              authorId: route.params.authorId
            }
          }
        },
      },
      // 使用者個人頁面
      {
        path: 'user',
        name: 'User',
        components: {
          default: () => import('@/views/User/UserPage.vue'),
        },
        meta: { requiresAuth: true, navbar: true, recordPath: true },
        props: {
          default(route) {
            return {
              view: route.params.target,
            }
          }
        },
        children: [
          {
            path: ':userId/:target?',
            name: 'UserDetail',
            components: {
              info: () => import('@/views/User/UserInfo.vue'),
              profile: () => import('@/views/User/UserProfile.vue'),
              articles: () => import('@/views/User/UserArticles.vue'),
              collections: () => import('@/views/User/UserCollections.vue'),
              plan: () => import('@/views/User/UserPlan.vue'),
              subscriptions: () => import('@/views/User/UserSubscriptions.vue'),
            },
            meta: { requiresAuth: true, navbar: true, recordPath: true, signOutBackToHome: true },
            beforeEnter(to, from, next) {
              if (to.params.userId !== store.state.userInfo.Username) {
                next({ name: 'SignIn' })
              } else if (!to.params.target) {
                next({
                  name: 'UserDetail',
                  params: {
                    userId: store.state.userInfo.Username,
                    target: 'profile',
                  }
                })
              } else {
                next()
              }
            }
          }
        ],
      },
      // 關於、FAQ
      {
        path: 'intro',
        name: 'Intro',
        components: {
          default: () => import('@/views/Intro/IntroPage.vue')
        },
        meta: { requiresAuth: false, navbar: true, recordPath: true },
        children: [
          {
            path: 'about',
            name: 'About',
            components: {
              default: () => import('@/views/Intro/IntroAbout.vue')
            },
            meta: { requiresAuth: false, navbar: true, recordPath: true },
          },
          {
            path: 'faq',
            name: 'Faq',
            components: {
              default: () => import('@/views/Intro/IntroFaq.vue')
            },
            meta: { requiresAuth: false, navbar: true, recordPath: true },
          },
        ],
      },
      // 404 Not Found
      {
        path: '/:pathMatch(.*)',
        redirect: { name: 'NotFound', query: { status: 404 } }
      },
      {
        path: 'error',
        name: 'NotFound',
        components: {
          default: () => import('@/views/NotFound.vue')
        },
        meta: { error: 404, navbar: true, },
        props: {
          default(route) {
            return {
              message: route.query.message
            }
          }
        }
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
    return { top: 0, behavior: 'smooth', }
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
  if (to.path !== from.path) {
    NProgress.start()
  }

  // 判斷記錄導頁前路徑
  if (from.name !== store.state.recordPath) {
    store.commit(
      'SET_RECORD_PATH',
      from.meta.recordPath ? from.fullPath : '/'
    )
  }

  // 判斷是否驗證導頁
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('kirukiruToken')
    if (token) {
      getUserInfo(token).then(res => {
        console.log('頁面要求驗證登入狀態: ', res)
        if (res.data.success) {
          next()
        } else {
          localStorage.removeItem('kirukiruToken')
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