<template>
  <div class="flex relative justify-center translate-x-12">
    <div class="pt-16 pb-11 pl-4 max-w-[816px] md:pl-8">
      <router-view></router-view>
    </div>
    <div class="sticky top-16 mt-16 w-48 h-screen border-x border-t border-myBrown">
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