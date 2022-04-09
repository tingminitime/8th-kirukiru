<template>
  <div class="py-11 px-4 mx-auto max-w-[1024px] md:px-8">
    <div class="flex gap-7 items-start">
      <!-- 左側設定欄 -->
      <div class="flex flex-col gap-12 py-8 px-12 min-w-[192px] min-h-[726px] bg-myBrown md:min-w-[256px]">
        <!-- 個人設定 -->
        <div class="flex flex-col gap-3 items-center w-full">
          <div class="py-2 w-full border-b border-white/60">
            <span class="block font-semibold text-center text-myYellow">個人設定</span>
          </div>
          <router-link
            :to="{ name: 'UserDetail', params: { target: 'info' } }"
            class="py-2 min-w-[140px] font-semibold text-center text-white rounded-lg"
            :class="menuButtonActive('info')"
          >
            個人資料
          </router-link>
          <router-link
            :to="{ name: 'UserDetail', params: { target: 'profile' } }"
            class="py-2 min-w-[140px] font-semibold text-center text-white rounded-lg"
            :class="menuButtonActive('profile')"
          >
            我的主頁
          </router-link>
        </div>
        <!-- 切切總覽 -->
        <div class="flex flex-col gap-3 items-center w-full">
          <div class="py-2 w-full border-b border-white/60">
            <span class="block font-semibold text-center text-myYellow">切切總覽</span>
          </div>
          <router-link
            :to="{ name: 'UserDetail', params: { target: 'articles' } }"
            class="py-2 min-w-[140px] font-semibold text-center text-white rounded-lg"
            :class="menuButtonActive('articles')"
          >
            文章總覽
          </router-link>
          <router-link
            :to="{ name: 'UserDetail', params: { target: 'collections' } }"
            class="py-2 min-w-[140px] font-semibold text-center text-white rounded-lg"
            :class="menuButtonActive('collections')"
          >
            收藏總覽
          </router-link>
        </div>
        <!-- 訂閱設定 -->
        <div class="flex flex-col gap-3 items-center w-full">
          <div class="py-2 w-full border-b border-white/60">
            <span class="block font-semibold text-center text-myYellow">訂閱設定</span>
          </div>
          <router-link
            :to="{ name: 'UserDetail', params: { target: 'plan' } }"
            class="py-2 min-w-[140px] font-semibold text-center text-white rounded-lg"
            :class="menuButtonActive('plan')"
          >
            我的方案
          </router-link>
          <router-link
            :to="{ name: 'UserDetail', params: { target: 'subscriptions' } }"
            class="py-2 min-w-[140px] font-semibold text-center text-white rounded-lg"
            :class="menuButtonActive('subscriptions')"
          >
            我的訂閱
          </router-link>
        </div>
      </div>
      <!-- 設定內容 -->
      <router-view
        v-slot="{ Component }"
        :name="view"
        @get-info="getNewUserInfo"
      >
        <KeepAlive>
          <transition
            mode="out-in"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform opacity-0 translate-x-48"
            enter-to-class="transform opacity-100 translate-x-0"
          >
            <component :is="Component"></component>
          </transition>
        </KeepAlive>
      </router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getUserInfo,
} from '@api'

import { setLocale } from 'yup'
setLocale({
  mixed: {
    default: '無效的輸入',
    required: '必填欄位',
    notType: "無效的數值",
  },
  string: {
    min: '長度不可小於 ${min}',
    max: '不可大於 ${max} 字元',
    email: '須符合 Email 格式 !'
  },
})

export default {
  name: 'UserPage',
  props: {
    view: {
      type: String,
      default: 'profile',
    },
  },
  data() {
    return {
      // view: 'profile',
    }
  },
  computed: {
    ...mapGetters([
      'userSignInStatus'
    ])
  },
  methods: {
    menuButtonActive(view) {
      return this.view === view ? 'bg-myYellow text-myBrown' : 'hover:bg-white/10'
    },
    // 取得新的使用者資訊
    getNewUserInfo() {
      getUserInfo().then(res => {
        console.log('重新取得使用者資訊: ', res)
        if (res.data.success) {
          this.$store.commit('SET_USER_INFO', res.data.data)
        } else {
          console.log('驗證過期，請重新登入 !')
          localStorage.removeItem('kirukiruToken')
          this.$router.push({ name: 'SignIn' })
        }
      })
      .catch(error => {
        this.$notify({
          group: "error",
          title: "Error",
          text: `${error}`
        }, 2500)
        this.$router.push({ name: 'HomePage' })
      })
    },
  },
}
</script>