<template>
  <router-link
    :to="{ name: 'ArticleCommon', params: { articleId: artId } }"
    class="block relative w-[256px] h-[204px] bg-myGray rounded-b-2xl border border-myBrown drop-shadow-md"
  >
    <div class="flex flex-col">
      <div class="flex justify-between items-center">
        <p class="py-1 px-2 w-1/2 text-xs font-semibold text-myBrown bg-myYellow">
          {{ artArtlog }}
        </p>
        <div class="px-2">
          <span
            v-timeformat="{
              time: artInitDate,
              format: 'YYYY.MM.DD'
            }"
            class="text-xs text-black/60"
          ></span>
        </div>
      </div>
      <div class="py-3">
        <h3 class="px-2 min-h-[3.5rem] text-lg font-semibold text-myBrown line-clamp-2">
          <!-- 付費文章 Tag -->
          <PayArticleTag
            v-if="!isFree"
            class="text-white bg-black/40"
          ></PayArticleTag>
          <span class="ml-1">{{ title }}</span>
        </h3>
      </div>
      <div class="p-2 min-h-[56px] bg-myYellow">
        <p class="text-sm text-myBrown text-ellipsis line-clamp-2">
          {{ convertText(introduction) }}
        </p>
      </div>
      <div class="flex justify-between items-center py-1 px-2">
        <div class="flex gap-4 justify-between p-2">
          <!-- 喜歡 -->
          <div class="flex items-center text-myBrown">
            <span class="inline-block px-0.5 text-sm align-middle material-icons">favorite_border</span>
            <span class="inline-block px-0.5 text-sm align-middle">{{ lovecount }}</span>
          </div>
        </div>
        <router-link
          class="group flex gap-2 items-center"
          :to="{ name: 'AuthorDetail', params: { authorId: username } }"
        >
          <p class="text-sm text-myBrown group-hover:text-myOrange">
            {{ author }}
          </p>
          <div class="overflow-hidden w-8 h-8 rounded-full md:w-8 md:h-8">
            <img
              v-my-src="{
                name: authorPic,
                folder: 'Pic',
              }"
              class="object-cover w-full h-full bg-center scale-[103%] load"
              alt=""
            >
          </div>
        </router-link>
      </div>
    </div>
  </router-link>
</template>

<script>
import { convert } from 'html-to-text'
import PayArticleTag from '@/components/article/PayArticleTag.vue'

export default {
  name: 'CommonCard',
  components: {
    PayArticleTag,
  },
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
    articlecategoryId: {
      type: [String, Number],
      default: 0,
    },
    artArtlog: {
      type: [String, Number],
      default: 0,
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
    },
  },
  methods: {
    convertText(content) {
      return convert(content)
    },
  },
}
</script>