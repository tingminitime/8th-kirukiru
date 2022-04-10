<template>
  <MainBanner></MainBanner>
  <div class="mx-auto mb-8 bg-myYellow">
    <div class="py-8 mx-auto max-w-[816px]">
      <h3 class="mb-4 text-xl font-bold text-center text-white md:text-2xl">
        你最佳的步驟型寫作工具
      </h3>
      <div class="grid grid-cols-2 grid-rows-2 grid-flow-row gap-3 px-4 md:grid-cols-4 md:grid-rows-1 md:gap-6 md:px-0">
        <div class="mx-auto">
          <img
            src="@img/home-tool-1.png"
            alt=""
          >
        </div>
        <div class="mx-auto">
          <img
            src="@img/home-tool-2.png"
            alt=""
          >
        </div>
        <div class="mx-auto">
          <img
            src="@img/home-tool-3.png"
            alt=""
          >
        </div>
        <div class="mx-auto">
          <img
            src="@img/home-tool-4.png"
            alt=""
          >
        </div>
      </div>
      <h2 class="py-12 text-2xl font-bold text-center text-white md:text-3xl">
        現在就開始你的切切旅程 !
      </h2>
      <div class="flex flex-col gap-4 justify-center px-8 md:flex-row md:px-0">
        <router-link
          :to="{ hash: '#feature' }"
          class="py-2 min-w-[224px] font-semibold text-center text-white hover:bg-white/20 rounded-lg outline-2 outline-myGray outline outline-offset-[-2px]"
        >
          先去看看 👇
        </router-link>
        <router-link
          :to="{ name: 'SignUp' }"
          class="py-2 min-w-[224px] font-semibold text-center text-myBrown bg-myGray rounded-lg"
        >
          加入切切
        </router-link>
      </div>
    </div>
  </div>
  <!-- 編輯精選 -->
  <div class="pt-6 mx-auto mb-8 max-w-[816px] md:py-6 md:mb-16">
    <div class="">
      <h3
        id="feature"
        class="px-4 mb-2 text-xl font-bold text-myBrown md:px-0 md:mb-6 md:text-2xl"
      >
        編輯精選
      </h3>
    </div>
    <div class="grid grid-cols-2 grid-flow-row gap-x-4 gap-y-3 px-4 md:grid-cols-3 md:gap-x-6 md:px-0">
      <!-- Main -->
      <div class="overflow-hidden col-span-2 rounded-b-2xl border border-myBrown drop-shadow md:col-span-1">
        <div class="aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3">
          <img
            v-my-src="{
              name: mainFeature?.firstPhoto,
              folder: 'images',
            }"
            class="object-cover object-center w-full h-full load"
            alt=""
          >
        </div>
        <div class="flex justify-between items-center p-2 min-h-[3.5rem] text-myBrown bg-white border-t border-myBrown">
          <h3 class="font-semibold leading-5 line-clamp-2">
            {{ mainFeature?.title }}
          </h3>
          <span class="px-1 material-icons">arrow_forward</span>
        </div>
      </div>
      <!-- Second -->
      <div class="overflow-hidden rounded-b-2xl border border-myBrown drop-shadow">
        <div class="aspect-w-4 aspect-h-3">
          <img
            v-src="`https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`"
            class="object-cover object-center w-full h-full load"
            alt=""
          >
        </div>
        <div class="flex justify-between items-center p-2 min-h-[3.5rem] text-myBrown bg-white border-t border-myBrown">
          <h3 class="font-semibold leading-5 line-clamp-2">
            A Cataloging of Cafes
          </h3>
          <span class="px-1 material-icons">arrow_forward</span>
        </div>
      </div>
      <!-- Third -->
      <div class="overflow-hidden rounded-b-2xl border border-myBrown drop-shadow">
        <div class="aspect-w-4 aspect-h-3">
          <img
            v-src="`https://images.unsplash.com/photo-1615301665770-ccd2c4fda0bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80`"
            class="object-cover object-center w-full h-full load"
            alt=""
          >
        </div>
        <div class="flex justify-between items-center p-2 min-h-[3.5rem] text-myBrown bg-white border-t border-myBrown">
          <h3 class="font-semibold leading-5 line-clamp-2">
            Finally in Taiwan
          </h3>
          <span class="px-1 material-icons">arrow_forward</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 最新切切 -->
  <div class="mx-auto mb-8 max-w-[816px] border-t-myYellow md:mb-24 md:border-t-2">
    <div class="pt-6 md:py-6">
      <h3
        class="px-4 mb-2 text-xl font-bold text-myBrown md:px-0 md:mb-6 md:text-2xl"
      >
        最新切切
      </h3>
      <!-- 桌面板 -->
      <div
        v-if="newKiruArticles.length !== 0"
        class="hidden grid-cols-1 grid-flow-row gap-6 md:grid md:grid-cols-2"
      >
        <KiruCard
          v-for="article in newKiruArticles"
          v-bind="article"
          :key="article.artId"
        ></KiruCard>
      </div>
      <!-- 手機板 -->
      <KiruCardSwiper
        key="new-kiru"
        class="block md:hidden"
        :kiru-info="newKiruArticles"
      ></KiruCardSwiper>
    </div>
    <div class="flex justify-end items-center">
      <router-link
        :to="{
          name: 'CategoryContent',
          params: { searchType: 'kiru' },
          query: { categoryId: 1 },
        }"
        class="px-4 text-black/40 hover:text-black/80"
      >
        <span class="font-semibold align-middle">去看更多切切</span>
        <span class="align-middle material-icons">last_page</span>
      </router-link>
    </div>
  </div>
  <!-- 最新文章 -->
  <div class="mx-auto mb-8 max-w-[816px] border-t-myYellow md:mb-24 md:border-t-2">
    <div class="pt-6 md:py-6">
      <h3
        class="px-4 mb-2 text-xl font-bold text-myBrown md:px-0 md:mb-6 md:text-2xl"
      >
        最新文章
      </h3>
      <!-- 桌面板 -->
      <div
        v-if="newCommonArticles.length !== 0"
        class="hidden grid-cols-3 grid-flow-row gap-6 md:grid"
      >
        <CommonCard
          v-for="article in newCommonArticles"
          v-bind="article"
          :key="article.artId"
        ></CommonCard>
      </div>
      <!-- 手機板 -->
      <CommonCardSwiper
        key="new-common"
        class="block md:hidden"
        :common-info="newCommonArticles"
      ></CommonCardSwiper>
    </div>
    <div class="flex justify-end items-center px-4">
      <router-link
        :to="{
          name: 'CategoryContent',
          params: { searchType: 'common' },
          query: { categoryId: 1 },
        }"
        class="text-black/40 hover:text-black/80"
      >
        <span class="font-semibold align-middle">去看更多文章</span>
        <span class="align-middle material-icons">last_page</span>
      </router-link>
    </div>
  </div>
  <!-- 熱門切切 -->
  <div class="mx-auto mb-8 max-w-[816px] border-t-myYellow md:mb-16 md:border-t-2">
    <div class="pt-6 md:py-6">
      <h3
        class="px-4 mb-2 text-xl font-bold text-myBrown md:px-0 md:mb-6 md:text-2xl"
      >
        熱門切切
      </h3>
      <!-- 桌面板 -->
      <div
        v-if="hotKiruArticles.length !== 0"
        class="hidden grid-cols-1 grid-flow-row gap-6 md:grid md:grid-cols-2"
      >
        <KiruCard
          v-for="article in hotKiruArticles"
          v-bind="article"
          :key="article.artId"
        ></KiruCard>
      </div>
      <!-- 手機板 -->
      <KiruCardSwiper
        key="hot-kiru"
        class="block md:hidden"
        :kiru-info="hotKiruArticles"
      ></KiruCardSwiper>
    </div>
  </div>
  <!-- 熱門文章 -->
  <div class="mx-auto mb-8 max-w-[816px] border-t-myYellow md:mb-24 md:border-t-2">
    <div class="pt-6 md:py-6">
      <h3
        class="px-4 mb-2 text-xl font-bold text-myBrown md:px-0 md:mb-6 md:text-2xl"
      >
        熱門文章
      </h3>
      <!-- 桌面板 -->
      <div
        v-if="hotCommonArticles.length !== 0"
        class="hidden grid-cols-3 grid-flow-row gap-6 md:grid"
      >
        <CommonCard
          v-for="article in hotCommonArticles"
          v-bind="article"
          :key="article.artId"
        ></CommonCard>
      </div>
      <!-- 手機板 -->
      <CommonCardSwiper
        key="hot-common"
        class="block md:hidden"
        :common-info="hotCommonArticles"
      ></CommonCardSwiper>
    </div>
  </div>
</template>

<script>
import { convert } from 'html-to-text'
import MainBanner from '@/components/home/MainBanner.vue'
import KiruCard from '@/components/article/KiruCard.vue'
import CommonCard from '@/components/article/CommonCard.vue'
import KiruCardSwiper from '@/components/article/KiruCardSwiper.vue'
import CommonCardSwiper from '@/components/article/CommonCardSwiper.vue'
import {
  getNewKiruArticle,
  getNewCommonArticle,
  getHotKiruArticle,
  getHotCommonArticle,
  getFeatureArticle,
} from '@api'

export default {
  name: 'LandingPage',
  components: {
    MainBanner,
    KiruCard,
    CommonCard,
    KiruCardSwiper,
    CommonCardSwiper,
  },
  data() {
    return {
      newKiruArticles: [],
      newCommonArticles: [],
      hotKiruArticles: [],
      hotCommonArticles: [],
      featureArticles: [],
      newKiruArticleVm: {
        nowpage: 1,
        showcount: 4,
      },
      newCommonArticleVm: {
        nowpage: 1,
        showcount: 6,
      },
      hotKiruArticleVm: {
        nowpage: 1,
        showcount: 4,
      },
      hotCommonArticleVm: {
        nowpage: 1,
        showcount: 6,
      },
    }
  },
  computed: {
    mainFeature() {
      return this.featureArticles[0]
    },
  },
  mounted() {
    this.getNewKiruArticle()
    this.getNewCommonArticle()
    this.getHotKiruArticle()
    this.getHotCommonArticle()
    this.getFeatureArticle()
  },
  methods: {
    convertText(content) {
      return convert(content)
    },
    // 取得最新切切
    getNewKiruArticle() {
      getNewKiruArticle(this.newKiruArticleVm).then(res => {
        console.log('(首頁)取得最新切切: ', res)
        if (res.data.success) {
          this.newKiruArticles = res.data.data
        } else {
          console.warn('(首頁)取得最新切切失敗: ', res)
        }
      })
    },
    // 取得最新文章
    getNewCommonArticle() {
      getNewCommonArticle(this.newCommonArticleVm).then(res => {
        console.log('(首頁)取得最新文章: ', res)
        if (res.data.success) {
          this.newCommonArticles = res.data.data
        } else {
          console.warn('(首頁)取得最新文章失敗: ', res)
        }
      })
    },
    // 取得熱門切切
    getHotKiruArticle() {
      getHotKiruArticle(this.hotKiruArticleVm).then(res => {
        console.log('(首頁)取得熱門切切: ', res)
        if (res.data.success) {
          this.hotKiruArticles = res.data.data
        } else {
          console.warn('(首頁)取得熱門切切失敗: ', res)
        }
      })
    },
    // 取得熱門文章
    getHotCommonArticle() {
      getHotCommonArticle(this.hotCommonArticleVm).then(res => {
        console.log('(首頁)取得熱門文章: ', res)
        if (res.data.success) {
          this.hotCommonArticles = res.data.data
        } else {
          console.warn('(首頁)取得熱門文章失敗: ', res)
        }
      })
    },
    // 取得精選文章
    getFeatureArticle() {
      getFeatureArticle().then(res => {
        console.log('(首頁)取得精選文章: ', res)
        if (res.data.success) {
          this.featureArticles = res.data.data
        } else {
          console.warn('(首頁)取得精選文章失敗: ', res)
        }
      })
    },
  },
}
</script>