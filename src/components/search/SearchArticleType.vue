<template>
  <!-- 選擇切切 / 一般 -->
  <div
    class="before:hidden flex relative before:absolute before:top-0 before:left-0 gap-4 justify-center items-center px-8 before:w-1/2 before:h-full before:bg-myYellow before:transition-all md:before:block md:gap-0 md:px-0"
    :class="{ 'before:translate-x-full': searchType === 'common' }"
  >
    <button
      type="button"
      class="block z-10 py-1 w-full text-sm font-semibold text-center text-myBrown rounded-xl border border-myYellow transition-all md:py-2 md:text-base md:hover:bg-myYellow/10 md:rounded-none"
      :class="{ 'bg-myYellow': searchType === 'kiru' }"
      @click="articleTypeChange('kiru')"
    >
      切切文章
    </button>
    <button
      type="button"
      class="block z-10 py-1 w-full text-sm font-semibold text-center text-myBrown rounded-xl border border-myYellow transition-all md:py-2 md:text-base md:hover:bg-myYellow/10 md:rounded-none md:border-l-0"
      :class="{ 'bg-myYellow': searchType === 'common' }"
      @click="articleTypeChange('common')"
    >
      一般文章
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchArticleType',
  props: {
    searchType: {
      type: String,
      default: 'kiru'
    },
  },
  emits: ['article-type'],
  data() {
    return {
      // articleType: 'kiru',
    }
  },
  methods: {
    articleTypeChange(type) {
      // this.articleType = type
      this.$emit('article-type', type)
    },
  },
}
</script>