<template>
  <div class="flex relative gap-3 justify-center lg:translate-x-12">
    <div class="pb-32 min-w-[375px] md:pt-16 md:pl-8">
      <router-view :key="$route.path"></router-view>
    </div>
    <div
      class="hidden sticky top-16 pl-4 mt-16 mb-4 w-48 h-screen border-l border-myBrown/20 lg:block"
    >
      <div class="py-12">
        我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔
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
  }
}
</script>