<template>
  <!-- 文章頂部資訊 -->
  <div class="p-4 mb-16 w-full">
    <!-- 文章封面圖片 -->
    <div class="w-full h-[440px]">
      <img
        v-src="coverUrl"
        class="object-cover w-full h-full bg-center transition-opacity duration-300 cover load"
        alt=""
      >
    </div>
    <!-- 分類 -->
    <div class="py-3 mb-6">
      <p class="flex gap-1">
        <span class="text-myBrown">切切分類</span>
        <span class="text-myBrown/60 material-icons">chevron_right</span>
        <a
          href="javascript:;"
          class="text-myBrown hover:text-myYellow"
        >居家生活</a>
      </p>
    </div>
    <!-- 標題 -->
    <div class="grid grid-cols-3 mb-6">
      <h1 class="flex col-span-2 items-start text-3xl font-bold text-myBrown">
        {{ title }}
      </h1>
      <div class="flex flex-col items-end">
        <p
          v-show="artInitDate"
          v-timeformat="{
            time: artInitDate,
            format: 'YYYY/MM/DD HH:mm'
          }"
          class="text-right text-black/60"
        >
        </p>
        <p class="text-right text-black/60">
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
    kiruCount: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      coverUrl: '',
    }
  },
  watch: {
    firstPhoto(newVal) {
      this.coverUrl = `https://kirukiru.rocket-coding.com/Pic/${newVal}`
    },
  }
}
</script>

<style lang="sass" scope>
  .cover
    &.load
      width: 752px
</style>