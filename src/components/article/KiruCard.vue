<template>
  <router-link
    :to="{ name: 'ArticleContent', params: { articleId: 1 } }"
    class="block relative p-2 w-[396px] h-[202px] bg-white border border-myBrown"
  >
    <div class="flex flex-col">
      <div class="max-w-[248px] border border-myBrown">
        <div class="aspect-w-16 aspect-h-9">
          <img
            v-src="'https://picsum.photos/600/600?random=1'"
            class="object-cover object-center w-full h-full"
            alt=""
          >
        </div>
      </div>
      <div class="flex justify-between items-center mt-2">
        <router-link
          class="flex gap-2 items-center"
          :to="{ name: 'Author', params: { authorId: 1 } }"
        >
          <div class="overflow-hidden w-8 h-8 rounded-full md:w-8 md:h-8">
            <img
              v-src="`https://kirukiru.rocket-coding.com/Pic/origin.jpg`"
              class="object-cover w-full h-full bg-center scale-[103%] load"
              alt=""
            >
          </div>
          <p class="text-sm text-myBrown">
            快樂的切切人
          </p>
        </router-link>
        <div class="flex gap-4 justify-between py-2">
          <!-- 喜歡 -->
          <div class="flex items-center text-myBrown hover:text-myOrange">
            <span class="inline-block px-0.5 text-sm align-middle material-icons">favorite_border</span>
            <span class="inline-block px-0.5 text-sm align-middle">12</span>
          </div>
          <!-- 收藏 -->
          <div class="flex items-center text-myBrown hover:text-myOrange">
            <span class="inline-block px-0.5 text-sm align-middle scale-110 material-icons-outlined">bookmark_border</span>
            <span class="inline-block px-0.5 text-sm align-middle">20</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex absolute top-1/2 right-0 flex-col gap-2 justify-center items-end translate-y-[-60%]">
      <div class="py-1 px-2 w-4/6 bg-white border-y border-l border-myBrown">
        <h3 class="text-lg font-semibold leading-6 text-myBrown line-clamp-2">
          膽小的人別看 不可告人的秘密 我從椅子上跳了起來
        </h3>
      </div>
      <div class="py-1 px-2 w-1/2 bg-white border-y border-l border-myBrown">
        <p class="text-sm text-myBrown line-clamp-3">
          美國前總統歐巴馬也在近日受訪中，不否認外星人的存在，引起...
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'KiruCard',
  props: {
    title: {
      type: String,
      default: '',
    }
  },
}
</script>