<template>
  <li class="mb-8 rounded-b-2xl border border-black/20 shadow-md">
    <router-link
      :to="{ name: 'ArticleCommon', params: { articleId: artId } }"
      target="_blank"
      class="flex flex-col border-t-8 border-t-myYellow md:grid"
      :class="[ isShowAuthor ? 'md:grid-cols-3' : 'md:grid-cols-4' ]"
    >
      <!-- 標題和文章文字 -->
      <div
        class="pt-4 pb-2 md:py-4"
        :class="[ isShowAuthor ? 'md:col-span-2' : 'md:col-span-3' ]"
      >
        <div class="px-4 min-h-[76px] border-r border-r-black/20">
          <h3 class="mb-3 font-bold text-myBrown line-clamp-1">
            {{ title }}
          </h3>
          <p
            class="text-sm text-myBrown line-clamp-2"
            :class="{ 'text-myBrown/40': !introduction }"
          >
            {{ convertText(introduction) || '本篇文章無簡介內容' }}
          </p>
        </div>
      </div>
      <!-- 作者、時間、愛心 -->
      <div class="flex gap-4 justify-evenly items-center pr-6 pb-2 pl-4 md:gap-3 md:pb-0">
        <div class="flex grow gap-2 justify-between items-center md:flex-col md:grow-0 md:justify-center">
          <!-- 作者資訊 -->
          <router-link
            v-if="isShowAuthor"
            class="group flex gap-2 items-center"
            :to="{ name: 'Author', params: { authorId: username } }"
          >
            <div class="overflow-hidden shrink-0 w-8 h-8 rounded-full">
              <img
                v-src="`https://kirukiru.rocket-coding.com/Pic/origin.jpg`"
                class="object-cover w-full h-full bg-center scale-[103%] load"
                alt=""
              >
            </div>
            <p class="pr-3 text-sm font-semibold text-black/80 group-hover:text-myOrange break-all line-clamp-1">
              {{ author }}
            </p>
          </router-link>
          <!-- 時間 -->
          <span
            v-timeformat="{
              time: ArtInitDate,
              format: 'YYYY.MM.DD'
            }"
            class="text-sm tracking-wide text-myBrown align-middle"
          ></span>
        </div>
        <!-- 愛心 -->
        <div class="flex items-center md:flex-col">
          <span class="text-lg text-myOrange align-middle material-icons">favorite_border</span>
          <span class="text-myOrange">{{ lovecount }}</span>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
import { convert } from 'html-to-text'

export default {
  name: 'AuthorCommon',
  components: {

  },
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
    ArtInitDate: {
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