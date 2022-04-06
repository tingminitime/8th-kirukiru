<template>
  <li class="mb-8">
    <router-link
      :to="{ name: 'ArticleKiru', params: { articleId: artId } }"
      target="_blank"
      class="flex grow gap-3"
    >
      <!-- 圖片 -->
      <div class="shrink-0 w-32 md:w-48">
        <div class="aspect-w-4 aspect-h-3 md:aspect-w-16 md:aspect-h-9">
          <img
            v-src="`https://kirukiru.rocket-coding.com/Pic/${firstPhoto}`"
            class="object-cover object-center w-full h-full rounded-lg load"
            alt=""
          >
        </div>
      </div>
      <!-- 內容 -->
      <div
        class="flex flex-col w-full md:px-3 md:border-r md:border-r-black/10"
        :class="[ isShowAuthor ? 'justify-between' : 'justify-start' ]"
      >
        <!-- title -->
        <div class="flex justify-between items-center mb-3">
          <h3 class="font-bold text-myBrown line-clamp-1">
            {{ title }}
          </h3>
          <span
            v-timeformat="{
              time: artInitDate,
              format: 'YYYY.MM.DD'
            }"
            class="text-sm tracking-wide text-myBrown"
          ></span>
        </div>
        <!-- 部分文章文字 -->
        <div class="mb-1">
          <p class="text-sm text-myBrown line-clamp-2">
            {{ convertText(introduction) }}
          </p>
        </div>
        <!-- 作者資訊 -->
        <div
          class="flex"
          :class="[ isShowAuthor ? 'justify-between' : 'justify-end' ]"
        >
          <router-link
            v-if="isShowAuthor"
            class="group flex gap-2 items-center"
            :to="{ name: 'AuthorDetail', params: { authorId: username } }"
          >
            <div class="overflow-hidden w-6 h-6 rounded-full md:w-8 md:h-8">
              <img
                v-src="`https://kirukiru.rocket-coding.com/Pic/origin.jpg`"
                class="object-cover w-full h-full bg-center scale-[103%] load"
                alt=""
              >
            </div>
            <p class="text-xs font-semibold text-black/80 group-hover:text-myOrange md:text-sm">
              {{ author }}
            </p>
          </router-link>
          <!-- 手機: 愛心 -->
          <div class="flex gap-2 items-center md:hidden">
            <span class="text-lg text-myOrange align-middle material-icons">favorite_border</span>
            <span class="text-myOrange">{{ lovecount }}</span>
          </div>
        </div>
      </div>
      <!-- 桌機: 愛心 -->
      <div class="hidden flex-col items-center md:flex">
        <span class="text-lg text-myOrange align-middle material-icons">favorite_border</span>
        <span class="text-myOrange">{{ lovecount }}</span>
      </div>
    </router-link>
  </li>
</template>

<script>
import { convert } from 'html-to-text'

export default {
  name: 'KiruSearchItem',
  props: {
    artId: {
      type: [String, Number],
      default: null,
    },
    username: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
    authorPic: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    introduction: {
      type: String,
      default: '',
    },
    firstPhoto: {
      type: String,
      default: '',
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    lovecount: {
      type: [String, Number],
      default: 0,
    },
    artInitDate: {
      type: String,
      default: '',
    },
    isShowAuthor: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {

    }
  },
  methods: {
    convertText(content) {
      return convert(content)
    },
  },
}
</script>