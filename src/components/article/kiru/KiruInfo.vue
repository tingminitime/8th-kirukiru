<template>
  <!-- 文章頂部資訊 -->
  <div class="mb-12 md:border md:border-myBrown/20">
    <!-- 文章頂部作者資訊 -->
    <div class="flex fixed bottom-0 left-0 z-20 justify-between items-center py-3 px-6 w-full bg-myGray/80 border-y border-myBrown/20 backdrop-blur md:relative md:bg-white/0 md:border-t-0 md:backdrop-blur-none">
      <div class="flex gap-8 items-center">
        <router-link
          class="block overflow-hidden w-12 h-12 rounded-full md:w-16 md:h-16"
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
          :class="{ load: isLoading }"
        >
          {{ isLoading ? '' : '水電皮卡的切切生活' }}
        </h2>
        <button class="hidden font-bold text-myBrown hover:text-myOrange border border-myYellow transition-all md:block button-sm">
          關注
        </button>
      </div>
      <div class="flex gap-5 justify-end items-center">
        <!-- 喜歡 -->
        <button class="block text-myBrown hover:text-myOrange">
          <span class="inline-block px-1 text-lg align-middle material-icons">favorite_border</span>
          <span class="inline-block px-1 text-lg align-middle">12</span>
        </button>
        <!-- 留言 -->
        <button class="block text-myBrown hover:text-myOrange">
          <span class="inline-block px-1 text-lg align-middle material-icons-outlined">mode_comment</span>
          <span class="inline-block px-1 text-lg align-middle">2</span>
        </button>
        <!-- 收藏 -->
        <button class="block text-myBrown hover:text-myOrange">
          <span class="inline-block px-1 text-lg align-middle scale-110 material-icons-outlined">bookmark_border</span>
        </button>
        <!-- 回覆 -->
        <button class="block text-myBrown hover:text-myOrange">
          <span class="inline-block px-1 text-2xl align-middle material-icons-outlined">file_upload</span>
        </button>
      </div>
    </div>
    <!-- 分類 -->
    <div class="py-3 px-6">
      <span class="text-myBrown">切切分類 ><a
        href="javascript:;"
        class="hover:text-myYellow"
      >居家生活</a></span>
    </div>
    <!-- 標題 -->
    <div class="grid grid-cols-3 py-8 px-6">
      <h1 class="flex col-span-2 items-center text-3xl font-bold text-myBrown">
        如何更換淋浴水龍頭? 標題很長的話就會變這樣最多二十八個字
      </h1>
      <div class="flex justify-end items-center">
        <p class="text-right text-gray-900">
          2022/02/22<br>此切切共有 9 個步驟
        </p>
      </div>
    </div>
    <!-- 文章封面圖片 -->
    <div class="h-[440px] border-y border-myBrown/20">
      <img
        v-src="'https://kirukiru.rocket-coding.com/Pic/Photo132925910285994883.jpg'"
        class="object-cover w-full h-full bg-center transition-opacity duration-300 load"
        alt=""
      >
    </div>
    <!-- 文章簡述 -->
    <div class="py-7 px-6">
      <p class="text-myBrown">
        填寫的切切資訊會在這裡，如果沒有填寫的話此欄位不顯示 Quodsi haberent magnalia inter potentiam et divitias, et non illam quidem haec eo spectant haec.
      </p>
    </div>
    <!-- 預備工具 -->
    <div class="bg-myBrown">
      <h2 class="py-1 text-xl font-bold text-center text-white">
        預備工具
      </h2>
    </div>
    <!-- 預備工具內容 -->
    <div class="grid grid-cols-2 grid-flow-row gap-x-2 gap-y-6 p-4 border-b border-myBrown/20">
      <div class="flex flex-col justify-between border border-myBrown md:flex-row">
        <div class="w-full border-b border-myBrown aspect-w-16 aspect-h-9 md:w-1/2 md:border-r md:border-b-0 md:aspect-w-12 md:aspect-h-4">
          <img
            v-src="'https://picsum.photos/800/600?random=1'"
            class="object-cover absolute tools load"
            alt=""
          >
        </div>
        <div class="flex flex-col justify-center p-4">
          <p class="mb-2 font-bold text-myBrown line-clamp-2">
            電風扇這裡可以放26個字兩行
          </p>
          <p>1 支</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KiruInfo',
  data() {
    return {
      isLoading: false,
    }
  }
}
</script>

<style lang="sass" scope>
  .author-name
    &.load
      width: 144px
      height: 24px
      border-radius: 4px
</style>