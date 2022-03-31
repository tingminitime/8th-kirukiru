<template>
  <router-link
    :to="{ name: 'ArticleCommon', params: { articleId: artId } }"
    class="block relative w-[256px] min-h-[184px] bg-myGray rounded-b-2xl border border-myBrown drop-shadow-md"
  >
    <div class="flex flex-col">
      <p class="py-1 px-2 w-1/2 text-myBrown bg-myYellow">
        {{ artArtlog }}
      </p>
      <h3 class="py-4 px-2 text-lg font-semibold text-myBrown line-clamp-2">
        {{ title }}
      </h3>
      <div class="p-2 min-h-[56px] bg-myYellow">
        <p class="text-sm text-myBrown text-ellipsis line-clamp-2">
          {{ convertText(introduction) }}
        </p>
      </div>
      <div class="flex justify-between items-center py-1 px-2">
        <div class="flex gap-4 justify-between p-2">
          <!-- 喜歡 -->
          <div class="flex items-center text-myBrown hover:text-myOrange">
            <span class="inline-block px-0.5 text-sm align-middle material-icons">favorite_border</span>
            <span class="inline-block px-0.5 text-sm align-middle">{{ lovecount }}</span>
          </div>
        </div>
        <router-link
          class="flex gap-2 items-center"
          :to="{ name: 'Author', params: { authorId: username } }"
        >
          <p class="text-sm text-myBrown">
            {{ author }}
          </p>
          <div class="overflow-hidden w-8 h-8 rounded-full md:w-8 md:h-8">
            <img
              v-src="`https://kirukiru.rocket-coding.com/Pic/origin.jpg`"
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

export default {
  name: 'NormalCard',
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
  },
  methods: {
    convertText(content) {
      return convert(content)
    },
  },
}
</script>