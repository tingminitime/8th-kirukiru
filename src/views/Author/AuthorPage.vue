<template>
  <div class="px-4 pt-8 pb-11 mx-auto max-w-[816px] min-h-[calc(100vh-56px-64px)] md:px-0 md:pt-16">
    <div class="relative mb-8 rounded-2xl border-t-8 border-t-myYellow shadow-md md:pb-12 md:mb-20 md:rounded-t-none md:rounded-b-2xl md:border md:border-myBrown md:shadow-sm">
      <!-- 桌面板 Title -->
      <div class="hidden h-8 bg-myYellow md:block"></div>
      <h1 class="hidden px-8 pt-4 pb-2 text-4xl font-bold text-myBrown md:block">
        <span class="line-clamp-1">{{ authorInfo.Name }}</span>
      </h1>
      <div class="flex flex-col gap-8 px-8 pt-8 pb-10 md:grid md:grid-cols-3 md:grid-rows-1 md:pt-4">
        <div class="flex gap-8 w-full md:block">
          <div class="overflow-hidden shrink-0 w-24 h-24 rounded-full md:w-auto md:h-auto md:rounded-none md:aspect-w-16 md:aspect-h-9">
            <img
              v-src="`https://kirukiru.rocket-coding.com/Pic/${authorInfo?.Userpic}`"
              class="object-cover object-center w-full h-full rounded-lg load"
              alt=""
            >
          </div>
          <!-- 手機板資訊 -->
          <div class="flex flex-col gap-2 md:hidden">
            <h1 class="mb-4 text-xl font-bold text-left text-myBrown">
              <span class="line-clamp-2">{{ authorInfo?.Name }}</span>
            </h1>
            <div class="text-myBrown">
              <span class="inline-block mr-2 w-20 text-sm align-super">發布文章</span>
              <span class="text-2xl font-bold align-bottom">
                {{ formatThousand(publishArticleCount) }}
              </span>
            </div>
            <div class="text-myBrown">
              <span class="inline-block mr-2 w-20 text-sm align-super">關注人數</span>
              <span class="text-2xl font-bold align-bottom">
                {{ formatThousand(subscribeCount) }}
              </span>
            </div>
            <div class="text-myBrown">
              <span class="inline-block mr-2 w-20 text-sm align-super">已關注</span>
              <span class="text-2xl font-bold align-bottom">
                {{ formatThousand(hasSubscribedCount) }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <p
            v-if="authorInfo.Introduction"
            class="text-sm text-myBrown whitespace-pre-wrap md:text-base"
            v-html="authorInfo.Introduction"
          ></p>
          <p
            v-else
            class="text-myBrown/40"
          >
            此作者尚未填寫簡介
          </p>
        </div>
      </div>
      <!-- 桌面板資訊 -->
      <div class="hidden absolute bottom-0 left-24 grid-cols-3 w-11/12 bg-myGray rounded-b-2xl border-t-8 border-myYellow/40 translate-y-1/2 md:grid md:drop-shadow-md">
        <div class="flex flex-col py-2 px-6">
          <span class="mb-1 text-myBrown border-b border-myBrown">發布文章</span>
          <span class="text-3xl font-bold text-myBrown">
            {{ formatThousand(publishArticleCount) }}
          </span>
        </div>
        <div class="flex flex-col py-2 px-6">
          <span class="mb-1 text-myBrown border-b border-myBrown">關注人數</span>
          <span class="text-3xl font-bold text-myBrown">
            {{ formatThousand(subscribeCount) }}
          </span>
        </div>
        <div class="flex flex-col py-2 px-6">
          <span class="mb-1 text-myBrown border-b border-myBrown">已關注</span>
          <span class="text-3xl font-bold text-myBrown">
            {{ formatThousand(hasSubscribedCount) }}
          </span>
        </div>
      </div>
    </div>
    <!-- 未訂閱，訂閱方案顯示 -->
    <div
      v-if="!checkSubResult && checkAccountResult === false && isAuthorOpenPlan"
      class="mb-6 rounded-2xl border-t-8 border-t-myYellow shadow-md md:rounded-t-none md:rounded-b-2xl md:border md:border-myBrown md:shadow-sm"
    >
      <!-- 桌面板 Title -->
      <h1 class="hidden py-2 text-2xl font-bold text-center text-myBrown bg-myYellow border-b border-myBrown md:block">
        訂閱方案
      </h1>
      <div
        class="flex flex-col items-center"
      >
        <p class="py-6 px-4 text-center text-myBrown md:py-8">
          這是訂閱方案，訂閱後即可解鎖觀看付費文章
        </p>
        <div class="flex flex-col justify-center items-center mb-6 font-semibold text-myBrown">
          <span>{{ authorInfo.Name }}</span>
          <span class="text-xl">$ {{ formatThousand(authorPlan.amount) }} NTD / 月</span>
        </div>
        <router-link
          :to="{ name: 'Subscribe', params: { authorId: authorId } }"
          class="block mb-10 font-bold text-myBrown hover:text-myOrange ring-2 ring-myYellow transition-all button-sm"
        >
          點我訂閱
        </router-link>
      </div>
    </div>
    <!-- 已訂閱顯示 -->
    <div v-if="checkSubResult && checkAccountResult === false && isAuthorOpenPlan">
      <div
        class="flex flex-col items-center"
      >
        <div class="mb-4">
          <span class="text-2xl font-semibold text-myBrown">您已訂閱此作者 !</span>
        </div>
        <button
          type="button"
          class="block mb-10 font-semibold text-gray-400 hover:text-myBrown ring-2 ring-gray-300 hover:ring-myYellow transition-all button-sm"
        >
          取消訂閱
        </button>
      </div>
    </div>
    <!-- 作者未開通訂閱方案顯示 -->
    <div
      v-if="!isAuthorOpenPlan"
      class="mb-8"
    >
      <p class="text-center text-black/20">
        此作者未開放訂閱方案
      </p>
    </div>
    <!-- 發布、收藏文章列表 -->
    <router-view
      :key="authorId"
      :author-id="authorId"
    ></router-view>
  </div>
</template>

<script>
import {
  getAuthorInfo,
  getAuthorArticleCount,
  getAuthorSubscribeCount,
  getAuthorHasSubscribedCount,
  getAuthorPlan,
} from '@api'
import { mapState } from 'vuex'

export default {
  name: 'AuthorPage',
  beforeRouteUpdate(to, from) {
    if (to.params.authorId !== from.params.authorId) {
      this.$store.commit('SHOW_OVERLAY_LOADING')
    }
    this.checkAccountResult = this.checkAccount(to.params.authorId)
    this.checkSubResult = this.checkSub(to.params.authorId)
    this.getAuthorInfo(to.params.authorId)
  },
  props: {
    authorId: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      authorInfo: {},
      publishArticleCount: 0,
      subscribeCount: 0,
      hasSubscribedCount: 0,
      checkSubResult: null,
      checkAccountResult: null,
      authorPlan: {},
      isAuthorOpenPlan: false,
    }
  },
  computed: {
    ...mapState([
      'userSubscribeList',
    ]),
  },
  watch: {
    'userSubscribeList': {
      handler() {
        console.log('userSubscribeList觸發訂閱狀態更新')
        this.checkAccountResult = this.checkAccount(this.authorId)
        this.checkSubResult = this.checkSub(this.authorId)
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.getAuthorInfo(this.authorId)
    this.getAuthorPlan()
    // this.checkAccountResult = this.checkAccount(this.authorId)
    // this.checkSubResult = this.checkSub(this.authorId)
  },
  methods: {
    // 檢查是否本人
    checkAccount(authorAccount) {
      const checkAccount = this.$store.state.userInfo.Username === authorAccount
      console.log('(作者頁面)檢查是否為本人: ', checkAccount)
      return checkAccount
    },
    // 檢查訂閱狀態
    checkSub(authorAccount) {
      const checkSubList = this.userSubscribeList.some(author => {
        return author.Author === authorAccount
      })
      console.log('(作者頁面)檢查訂閱狀態: ', checkSubList)
      return checkSubList
    },
    // 取得作者發布文章、關注人數、已關注數量
    getAuthorInfo(authorId) {
      Promise.all([
        getAuthorInfo(authorId),
        getAuthorArticleCount(authorId),
        getAuthorSubscribeCount(authorId),
        getAuthorHasSubscribedCount(authorId),
      ]).then(res => {
        this.$store.commit('HIDE_OVERLAY_LOADING')
        console.log('取得作者頁面數量資訊: ', res)
        const filterRes = res.map(data => data.data)
        this.authorInfo = filterRes[0].data
        this.publishArticleCount = filterRes[1].artcount
        this.subscribeCount = filterRes[2].orderNumber
        this.hasSubscribedCount = filterRes[3].beOrderNumber
      }).catch(error => console.error(error))
    },
    // 取得作者方案
    getAuthorPlan() {
      getAuthorPlan(this.authorId).then(res => {
        console.log('取得作者方案: ', res)
        if (res.data.success) {
          this.isAuthorOpenPlan = true
          this.authorPlan = res.data.data
        } else {
          // 作者未開通方案
          this.isAuthorOpenPlan = false
        }
      }).catch(error => console.error(error))
    },
    // 千分位逗點格式化
    formatThousand(str) {
      return String(str).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    },
  },
}
</script>