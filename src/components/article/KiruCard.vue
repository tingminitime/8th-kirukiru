<template>
  <router-link
    :to="{ name: 'ArticleKiru', params: { articleId: artId } }"
    class="block relative p-2 w-[396px] h-[202px] bg-white border border-myBrown"
  >
    <div class="flex flex-col">
      <div class="max-w-[248px] border border-myBrown">
        <div class="aspect-w-16 aspect-h-9">
          <img
            v-src="`https://kirukiru.rocket-coding.com/Pic/${firstPhoto}`"
            class="object-cover object-center w-full h-full load"
            alt=""
          >
        </div>
      </div>
      <div class="flex justify-between items-center mt-2">
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
          <p class="text-sm text-myBrown">
            {{ author }}
          </p>
        </router-link>
        <div class="flex gap-4 justify-between p-2">
          <!-- 喜歡 -->
          <div class="flex items-center text-myBrown hover:text-myOrange">
            <span class="inline-block px-0.5 text-sm align-middle material-icons">favorite_border</span>
            <span class="inline-block px-0.5 text-sm align-middle">{{ lovecount }}</span>
          </div>
          <!-- 收藏 -->
          <div class="flex items-center text-myBrown hover:text-myOrange">
            <span class="inline-block px-0.5 text-sm align-middle scale-110 material-icons-outlined">bookmark_border</span>
            <span class="inline-block px-0.5 text-sm align-middle">{{ collectionCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex absolute top-1/2 right-0 flex-col gap-2 justify-start items-end w-full h-full max-h-[136px] translate-y-[-60%]">
      <div class="py-1 px-2 w-4/6 bg-white border-y border-l border-myBrown">
        <h3 class="text-lg font-semibold leading-6 text-myBrown line-clamp-2">
          {{ title }}
        </h3>
      </div>
      <div
        v-show="introduction !== ''"
        class="py-1 px-2 w-1/2 bg-white border-y border-l border-myBrown"
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
  },
  methods: {
    convertText(content) {
      return convert(content)
    },
  },
}
</script>