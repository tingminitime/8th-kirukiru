<template>
  <router-link
    :to="{ name: 'ArticleKiru', params: { articleId: artId } }"
    class="group block overflow-hidden relative p-2 w-[396px] h-[212px] bg-myGray rounded-b-2xl border border-myBrown drop-shadow"
  >
    <!-- <div class="absolute top-0 left-0 z-10 group-hover:z-0 w-full h-full bg-black/[0.08] opacity-100 group-hover:opacity-0 transition-all"></div> -->
    <div class="flex flex-col">
      <div class="max-w-[248px] border border-myBrown">
        <div class="transition-all aspect-w-16 aspect-h-9 md:brightness-95 md:group-hover:brightness-100">
          <img
            v-src="`https://kirukiru.rocket-coding.com/Pic/${firstPhoto}`"
            class="object-cover object-center w-full h-full load"
            alt=""
          >
        </div>
      </div>
      <div class="flex justify-between items-center mt-2">
        <!-- 作者資訊 -->
        <router-link
          class="flex gap-2 items-center"
          :to="{ name: 'Author', params: { authorId: username } }"
        >
          <div class="overflow-hidden w-8 h-8 rounded-full md:w-8 md:h-8">
            <img
              v-src="`https://kirukiru.rocket-coding.com/Pic/${authorPic}`"
              class="object-cover w-full h-full bg-center scale-[103%] load"
              alt=""
            >
          </div>
          <p class="text-sm text-myBrown line-clamp-1">
            {{ author }}
          </p>
        </router-link>
        <div class="flex gap-4 justify-between px-2">
          <!-- 喜歡 -->
          <div class="flex items-center text-myBrown hover:text-myOrange">
            <span class="inline-block px-0.5 text-sm align-middle material-icons">favorite_border</span>
            <span class="inline-block px-0.5 text-sm align-middle">{{ lovecount }}</span>
          </div>
          <!-- 收藏 -->
          <div
            v-if="collectionCount !== 0"
            class="flex items-center text-myBrown hover:text-myOrange"
          >
            <span class="inline-block px-0.5 text-sm align-middle scale-110 material-icons-outlined">bookmark_border</span>
            <span class="inline-block px-0.5 text-sm align-middle">{{ collectionCount }}</span>
          </div>
        </div>
      </div>
      <!-- 切切發布時間 -->
      <div class="flex justify-end items-center px-2">
        <span
          v-timeformat="{
            time: artInitDate,
            format: 'YYYY.MM.DD'
          }"
          class="text-xs text-black/60"
        ></span>
      </div>
    </div>
    <!-- 標題及文章部分內容 -->
    <div class="flex absolute top-1/2 right-0 z-20 flex-col gap-2 justify-start items-end w-full h-full max-h-[136px] translate-y-[-60%]">
      <div class="py-1 px-2 w-4/6 min-h-[58px] bg-white border-y border-l border-myBrown drop-shadow-md">
        <h3 class="text-lg font-semibold leading-6 text-myBrown line-clamp-2">
          {{ title }}
        </h3>
      </div>
      <div
        v-show="introduction !== ''"
        class="py-1 px-2 w-1/2 bg-white border-y border-l border-myBrown drop-shadow"
      >
        <p class="text-sm text-myBrown line-clamp-3">
          {{ convertText(introduction) }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { convert } from 'html-to-text'

export default {
  name: 'KiruCard',
  props: {
    artId: {
      type: [String, Number],
      default: 0,
    },
    firstPhoto: {
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
    lovecount: {
      type: [String, Number],
      default: 0,
    },
    collectionCount: {
      type: [String, Number],
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: true,
    },
    artInitDate: {
      type: String,
      default: '',
    }
  },
  methods: {
    convertText(content) {
      return convert(content)
    },
  },
}
</script>