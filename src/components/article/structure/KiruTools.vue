<template>
  <div class="p-4 mb-12 md:mb-24">
    <!-- 預備工具 -->
    <div class="mb-7">
      <div class="flex gap-12 justify-between mb-2">
        <div class="myArticlePartTitle myArticlePartTitleBg">
          <h2 class="whitespace-nowrap">
            預備工具
          </h2>
        </div>
        <div class="hidden before:absolute relative before:top-1/2 grow w-2/3 before:w-full before:h-px before:bg-myBrown md:block"></div>
      </div>
      <p class="text-sm text-myBrown">
        此篇切切會用到的物品、工具、材料、環境...等
      </p>
    </div>
    <!-- 預備工具內容 -->
    <ul class="grid grid-cols-2 grid-flow-row gap-x-2 gap-y-6">
      <li 
        v-for="tool in tools"
        :key="tool.fId"
        class="flex flex-col justify-between border border-myBrown/20 md:flex-row md:justify-start md:items-center"
      >
        <div
          v-if="tool.secPhoto !== '.'"
          class="shrink-0 w-full border-b border-myBrown/60 aspect-w-16 aspect-h-9 md:w-1/2 md:border-r md:border-b-0 md:aspect-w-12 md:aspect-h-4"
        >
          <img
            v-my-src="{
              name: tool.secPhoto,
              folder: 'Pic',
            }"
            class="object-cover absolute tools load"
            alt=""
          >
        </div>
        <p
          class="px-2 font-bold text-myBrown line-clamp-3"
          :class="{ 'py-2': tool.secPhoto === '.' }"
        >
          {{ tool.mission }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'KiruTools',
  props: {
    tools: {
      type: Array,
      default: () => []
    }
  },
}
</script>