<template>
  <div
    class="p-4 w-full text-center bg-myBrown rounded-lg shadow-md sm:p-8"
  >
    <h3 class="hidden mb-2 text-3xl font-bold text-gray-900 dark:text-white md:block">
      以下內容僅限訂閱者閱覽
    </h3>
    <h3 class="block mb-2 text-3xl font-bold text-gray-900 dark:text-white md:hidden">
      限訂閱者閱覽
    </h3>
    <div class="flex gap-3 justify-center items-start py-4 mb-4">
      <router-link
        class="block overflow-hidden shrink-0 mt-2 w-12 h-12 rounded-full"
        :to="{ name: 'Author', params: { authorId: 1 } }"
      >
        <img
          v-src="`https://kirukiru.rocket-coding.com/Pic/${Userpic}`"
          class="object-cover w-full h-full bg-center scale-[103%] load"
          alt=""
        >
      </router-link>
      <div class="max-w-[80%] text-left text-white">
        <p class="text-myYellow">
          {{ Name }}
        </p>
        <p
          v-if="Introduction"
          class="text-sm leading-6 text-left text-white"
        >
          {{ Introduction }}
        </p>
        <p
          v-else
          class="text-sm leading-6 text-left text-white/60"
        >
          此作者沒有自我簡介
        </p>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <router-link
        class="py-2 px-4 text-lg text-white bg-myYellow/60 hover:bg-myYellow/80 rounded-lg transition-all"
        :to="{ name: 'AuthorDetail', params: { authorId: Username } }"
      >
        訂閱作者，觀看此文章
      </router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/prop-name-casing */
export default {
  name: 'SubscribeView',
  props: {
    Name: {
      type: String,
      default: '',
    },
    Username: {
      type: String,
      default: '',
    },
    Userpic: {
      type: String,
      default: '',
    },
    Introduction: {
      type: String,
      default: '',
    },
  },
}
</script>