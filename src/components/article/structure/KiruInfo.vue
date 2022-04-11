<template>
  <!-- 文章頂部資訊 -->
  <div class="w-full">
    <!-- 文章封面圖片 -->
    <div
      v-if="showCover"
      class="w-full max-h-[440px]"
    >
      <div class="aspect-w-16 aspect-h-9">
        <img
          v-my-src="{
            name: firstPhoto,
            folder: 'Pic',
          }"
          class="object-cover object-center w-full h-full bg-center transition-opacity duration-300 cover load"
          alt=""
        >
      </div>
    </div>
    <!-- 分類 -->
    <div class="py-3 mb-6">
      <p class="flex gap-1">
        <span class="text-myBrown">
          {{ $route.meta.articleType === 'kiru'
            ? '切切分類'
            : '文章分類'
          }}
        </span>
        <span class="text-myBrown/60 material-icons">chevron_right</span>
        <a
          href="javascript:;"
          class="text-myBrown hover:text-myYellow"
        >{{ artArtlog }}</a>
        <!-- <router-link :to="{ name: '' }" class="text-myBrown hover:text-myYellow">
          {{ artArtlog }}
        </router-link> -->
      </p>
    </div>
    <!-- 標題 -->
    <div class="grid grid-cols-3 mb-6">
      <h1 class="flex col-span-2 items-start text-3xl font-bold text-myBrown">
        {{ title }}
      </h1>
      <div class="flex flex-col items-end pt-1">
        <p
          v-show="artInitDate"
          v-timeformat="{
            time: artInitDate,
            format: 'YYYY/MM/DD HH:mm'
          }"
          class="text-right text-black/60"
        >
        </p>
        <p
          v-if="showKiruCount"
          class="text-right text-black/60"
        >
          此切切共有 <span class="text-black/80">{{ kiruCount }}</span> 個步驟
        </p>
      </div>
    </div>
    <!-- 文章簡述 -->
    <div
      v-if="introduction !== ''"
      class="mb-6"
    >
      <p
        class="text-myBrown"
        v-html="introduction"
      >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KiruInfo',
  props: {
    showCover: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    firstPhoto: {
      type: String,
      default: '',
    },
    introduction: {
      type: String,
      default: '',
    },
    articlecategoryId: {
      type: Number,
      default: null,
    },
    artArtlog: {
      type: String,
      default: '',
    },
    artInitDate: {
      type: String,
      default: '',
    },
    showKiruCount: {
      type: Boolean,
      default: false,
    },
    kiruCount: {
      type: Number,
      default: 0,
    }
  },
}
</script>

<style lang="sass" scope>
</style>