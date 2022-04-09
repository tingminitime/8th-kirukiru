<template>
  <!-- 文章頂部作者資訊 -->
  <div class="px-4 w-full">
    <div class="flex fixed bottom-0 left-0 z-20 justify-between items-center py-2 px-6 w-full bg-myGray/80 border-y border-myBrown/20 backdrop-blur md:relative md:z-0 md:bg-myYellow md:border md:border-myBrown md:backdrop-blur-none">
      <div class="flex gap-2 items-center md:gap-8">
        <router-link
          class="block overflow-hidden w-12 h-12 rounded-full md:w-14 md:h-14"
          :to="{ name: 'AuthorDetail', params: { authorId: username } }"
        >
          <img
            v-my-src="{
              name: authorPic,
              folder: 'Pic',
            }"
            class="object-cover w-full h-full bg-center scale-[103%] load"
            alt=""
          >
        </router-link>
        <h2
          class="font-medium line-clamp-1 md:line-clamp-2 author-name"
        >
          {{ author }}
        </h2>
        <router-link
          :to="{ name: 'AuthorDetail', params: { authorId: username } }"
          class="hidden font-bold text-myBrown hover:text-myOrange bg-myGray transition-all md:block button-sm"
        >
          關注
        </router-link>
      </div>
      <div class="flex gap-5 justify-end items-center">
        <!-- 喜歡 -->
        <AddLove
          v-bind="$attrs"
          :show-love-count="true"
          :love-count="loveCount"
          icon-class="inline-block px-1 text-sm md:text-lg align-middle material-icons"
          count-class="text-sm md:text-base"
          :is-add-love="isAddLove"
          :article-type="articleType"
        ></AddLove>
        <!-- 留言 -->
        <router-link
          :to="{
            name: $route.name,
            params: $route.params.articleId,
            hash: `#article-replies`,
          }" 
          class="block text-myBrown hover:text-myOrange"
        >
          <span class="inline-block px-1 text-sm align-middle md:text-lg material-icons-outlined">mode_comment</span>
          <span class="inline-block px-1 text-sm align-middle md:text-lg">{{ repliesCount }}</span>
        </router-link>
        <!-- 收藏 -->
        <AddCollection
          v-bind="$attrs"
          icon-class="inline-block px-1 text-base md:text-lg align-middle scale-110"
        ></AddCollection>
        <!-- 分享 -->
        <button
          ref="copylink"
          type="button"
          class="block text-myBrown hover:text-myOrange"
        >
          <span class="inline-block px-1 text-xl align-middle md:text-2xl material-icons-outlined">file_upload</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale-subtle.css'
import AddLove from '@/components/article/AddLove.vue'
import AddCollection from '@/components/article/AddCollection.vue'

export default {
  name: 'KiruAuthor',
  components: {
    AddLove,
    AddCollection,
  },
  props: {
    author: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    authorPic: {
      type: String,
      default: ''
    },
    loveCount: {
      type: Number,
      default: 0,
    },
    isAddLove: {
      type: Boolean,
      default: false,
    },
    // isCollect: {
    //   type: Boolean,
    //   default: false,
    // },
    repliesCount: {
      type: Number,
      default: 0,
    },
    articleType: {
      type: String,
      default: '',
    },
  },
  // emits: ['add-love'],
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