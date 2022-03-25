<template>
  <div class="flex relative gap-3 justify-center lg:translate-x-12">
    <div class="pb-32 max-w-[816px] md:pt-16 md:pl-8">
      <router-view></router-view>
    </div>
    <div
      class="hidden sticky top-16 mt-16 w-48 h-screen border-x border-t border-myBrown/20 lg:block"
    >
      <div class="py-12">
        我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔我是側邊攔
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'ArticlePage',
}
</script>