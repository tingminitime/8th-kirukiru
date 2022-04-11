<template>
  <li class="group flex gap-2 items-center py-2 mb-2">
    <div class="flex gap-8 justify-between items-center p-4 w-[calc(100%-80px)] bg-white rounded-lg transition-all md:gap-12">
      <!-- 文章標題、日期 -->
      <div class="flex flex-col gap-1 max-w-[320px]">
        <router-link
          class="font-bold text-myBrown line-clamp-1"
          target="_blank"
          :title="title"
          :to="{
            name: titleLink,
            params: {
              articleId: artId,
            },
          }"
        >
          {{ title }}
        </router-link>
        <span
          v-timeformat="{
            time: artInitDate,
            format: 'YYYY/MM/DD',
          }"
          class="text-sm text-black/60"
        ></span>
      </div>
      <!-- 愛心、留言數量 -->
      <div
        v-if="!showAuthor"
        class="flex flex-col gap-2 md:flex-row md:gap-3"
      >
        <!-- 愛心 -->
        <div class="flex items-center text-myBrown">
          <span class="inline-block px-0.5 text-sm align-middle material-icons">favorite_border</span>
          <span class="inline-block px-0.5 text-sm align-middle">{{ lovecount }}</span>
        </div>
        <!-- 留言 -->
        <div class="flex items-center text-myBrown">
          <span class="inline-block px-0.5 text-sm align-middle material-icons-outlined">mode_comment</span>
          <span class="inline-block px-0.5 text-sm align-middle">{{ messageCount }}</span>
        </div>
      </div>
      <!-- 顯示作者 -->
      <div v-else>
        <!-- 作者資訊 -->
        <router-link
          class="flex gap-2 items-center text-myBrown hover:text-myOrange"
          :to="{ name: 'AuthorDetail', params: { authorId: username } }"
        >
          <div class="overflow-hidden w-7 h-7 rounded-full md:w-7 md:h-7">
            <img
              v-my-src="{
                name: authorPic,
                folder: 'Pic',
              }"
              class="object-cover w-full h-full bg-center scale-[103%] load"
              alt=""
            >
          </div>
          <p class="text-sm line-clamp-1">
            {{ author }}
          </p>
        </router-link>
      </div>
    </div>
    <!-- 功能 -->
    <div
      v-if="showFeature"
      class="flex flex-col gap-1 justify-center self-stretch px-2 bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"
    >
      <router-link
        v-show="showEdit"
        type="button"
        target="_blank"
        :to="{
          name: editLink,
          params: {
            article: artId,
          },
        }"
      >
        <span class="inline-block p-1 px-2 text-base text-myBrown align-middle hover:bg-black/10 rounded-md material-icons">edit</span>
      </router-link>
      <button
        v-show="showDelete"
        type="button"
        @click="deleteArticleHandler"
      >
        <span class="inline-block p-1 px-2 text-base text-myBrown align-middle hover:bg-black/10 rounded-md material-icons">delete</span>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'MyArticleItem',
  props: {
    artId: {
      type: [String, Number],
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    artInitDate: {
      type: String,
      default: '',
    },
    lovecount: {
      type: Number,
      default: 0,
    },
    messageCount: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      default: '',
    },
    authorPic: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    showAuthor: {
      type: Boolean,
      default: false,
    },
    showFeature: {
      type: Boolean,
      default: false,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
    editLink: {
      type: String,
      default: '',
    },
    titleLink: {
      type: String,
      default: '',
    },
  },
  emits: ['delete-article'],
  methods: {
    deleteArticleHandler() {
      this.$emit('delete-article', {
        articleId: this.artId,
        articleTitle: this.title,
      })
    },
  },
}
</script>