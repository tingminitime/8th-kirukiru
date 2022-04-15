<template>
  <!-- 切切內容 -->
  <ul class="p-4 mb-20">
    <li
      v-for="(item, i) in content"
      :key="item.mId"
      class="mb-8 md:mb-4"
    >
      <div class="flex flex-col gap-3 border-myBrown/20 md:flex-row md:gap-0 md:border">
        <!-- 序號 -->
        <div class="flex shrink-0 order-1 justify-start items-center w-20 md:justify-center">
          <span class="text-4xl font-bold text-myBrown md:text-5xl">
            {{ i + 1 < 10 ? `0${i + 1}` : i + 1 }}
          </span>
        </div>
        <!-- 內容 -->
        <div
          class="flex grow order-3 items-center border-myBrown/20 md:order-2 md:px-6 md:border-l"
          :class="{ 'py-8': item.thirdPhoto === '.' }"
        >
          <p v-html="item.main"></p>
        </div>
        <!-- 圖片 -->
        <div
          v-if="item.thirdPhoto !== '.'"
          class="shrink-0 order-2 w-64 h-64 border-l border-myBrown/20 md:order-3"
        >
          <img
            v-my-src="{
              name: item.thirdPhoto,
              folder: 'Pic',
            }"
            class="object-cover w-full h-full load"
            alt=""
          >
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'KiruContent',
  props: {
    content: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    
  },
}
</script>