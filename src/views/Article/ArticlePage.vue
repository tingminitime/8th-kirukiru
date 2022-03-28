<template>
  <div class="flex relative gap-3 justify-center lg:translate-x-12">
    <div class="pb-32 min-w-[375px] md:pt-16 md:pl-8">
      <router-view
        :key="$route.path"
        @author-info="authorInfoHandler"
      ></router-view>
    </div>
    <!-- 側邊攔 -->
    <div
      v-if="authorInfo"
      class="hidden sticky top-16 pl-4 mt-16 mb-4 w-48 h-screen border-l border-myBrown/60 lg:block"
    >
      <div class="py-12">
        <div class="flex flex-col gap-3 justify-center items-center">
          <router-link
            class="block overflow-hidden w-24 h-24 rounded-full"
            :to="{ name: 'Author', params: { authorId: authorInfo.Username } }"
          >
            <img
              v-src="`https://kirukiru.rocket-coding.com/Pic/${authorInfo.Userpic}`"
              class="object-cover w-full h-full bg-center scale-[103%] load"
              alt=""
            >
          </router-link>
          <div class="w-full">
            <div class="text-center bg-myYellow">
              <p class="py-2 text-myBrown">
                {{ authorInfo.Name }}
              </p>
            </div>
            <div class="border-2 border-myYellow">
              <router-link
                class="block py-2 text-center text-myBrown hover:text-myOrange"
                :to="{ name: 'Author', params: { authorId: authorInfo.Username } }"
              >
                關注
              </router-link>
            </div>
          </div>
          <div>
            <p
              v-if="authorInfo.Introduction"
              class="pb-10 text-justify text-myBrown"
            >
              {{ authorInfo.Introduction }}
            </p>
            <p
              v-else
              class="text-sm text-myBrown/60"
            >
              此作者沒有簡介
            </p>
          </div>
          <div class="flex justify-center py-4 w-full border-t border-myBrown/20">
            <button
              type="button"
              class="block py-2 w-full text-myBrown hover:text-myOrange border-2 border-myBrown"
            >
              <span class="inline-block px-1 text-lg align-middle material-icons">favorite_border</span>
            </button>
            <button
              type="button"
              class="block py-2 w-full text-myBrown hover:text-myOrange border-y-2 border-r-2 border-myBrown"
            >
              <span class="inline-block px-1 text-lg align-middle scale-110 material-icons-outlined">bookmark_border</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ScrollToTop></ScrollToTop>
</template>

<script>
import ScrollToTop from '@/components/utils/ScrollToTop.vue'

export default {
  name: 'ArticlePage',
  components: {
    ScrollToTop,
  },
  data() {
    return {
      authorInfo: null,
    }
  },
  methods: {
    authorInfoHandler(info) {
      console.log('側邊欄用作者資訊: ', info)
      this.authorInfo = info
    },
  },
}
</script>