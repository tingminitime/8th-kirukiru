<template>
  <!-- 文章頂部作者資訊 -->
  <div class="px-4">
    <div class="flex fixed bottom-0 left-0 z-20 justify-between items-center py-2 px-6 w-full bg-myGray/80 border-y border-myBrown/20 backdrop-blur md:relative md:z-0 md:mb-6 md:bg-myYellow md:border md:border-myBrown md:backdrop-blur-none">
      <div class="flex gap-8 items-center">
        <router-link
          class="block overflow-hidden w-12 h-12 rounded-full md:w-14 md:h-14"
          :to="{ name: 'Author', params: { authorId: 1 } }"
        >
          <img
            v-src="'https://kirukiru.rocket-coding.com/Pic/origin.jpg'"
            class="object-cover w-full h-full bg-center scale-[103%] load"
            alt=""
          >
        </router-link>
        <h2
          class="font-medium author-name"
        >
          {{ author }}
        </h2>
        <button class="hidden font-bold text-myBrown hover:text-myOrange bg-myGray transition-all md:block button-sm">
          關注
        </button>
      </div>
      <div class="flex gap-5 justify-end items-center">
        <!-- 喜歡 -->
        <button class="block text-myBrown hover:text-myOrange">
          <span class="inline-block px-1 text-lg align-middle material-icons">favorite_border</span>
          <span class="inline-block px-1 text-lg align-middle">{{ lovecount }}</span>
        </button>
        <!-- 留言 -->
        <router-link
          :to="{
            name: $route.name,
            params: $route.params.articleId,
            hash: `#article-kiru-replies`,
          }" 
          class="block text-myBrown hover:text-myOrange"
        >
          <span class="inline-block px-1 text-lg align-middle material-icons-outlined">mode_comment</span>
          <span class="inline-block px-1 text-lg align-middle">{{ repliesCount }}</span>
        </router-link>
        <!-- 收藏 -->
        <button class="block text-myBrown hover:text-myOrange">
          <span class="inline-block px-1 text-lg align-middle scale-110 material-icons-outlined">bookmark_border</span>
        </button>
        <!-- 分享 -->
        <button
          ref="copylink"
          class="block text-myBrown hover:text-myOrange"
        >
          <span class="inline-block px-1 text-2xl align-middle material-icons-outlined">file_upload</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import tippy from 'tippy.js'

export default {
  name: 'KiruAuthor',
  props: {
    author: {
      type: String,
      default: '',
    },
    lovecount: {
      type: Number,
      default: 0,
    },
    repliesCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  mounted() {
    tippy(this.$refs.copylink, {
      content: '點我複製連結',
      inertia: true,
      animation: 'scale-subtle',
    })
    tippy(this.$refs.copylink, {
      async onTrigger(instance, event) {
        console.log(instance, event)
        const clipboardObj = navigator.clipboard
        await navigator.clipboard.writeText(location.href)
        console.log(clipboardObj)
        setTimeout(() => {
          instance.hide()
        }, 2000)
      },
      content: '已複製連結',
      inertia: true,
      animation: 'scale-subtle',
      trigger: 'click',
    })
  }
}
</script>

<style lang="sass" scoped>
</style>