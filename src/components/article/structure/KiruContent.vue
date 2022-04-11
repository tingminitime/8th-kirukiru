<template>
  <!-- 切切內容 -->
  <ul class="p-4 mb-20">
    <li
      v-for="(item, i) in content"
      :key="item.mId"
      class="mb-4"
    >
      <div class="flex border border-myBrown/20">
        <!-- 序號 -->
        <div class="flex shrink-0 justify-center items-center w-20">
          <span class="text-4xl font-bold text-myBrown md:text-5xl">
            {{ i + 1 < 10 ? `0${i + 1}` : i + 1 }}
          </span>
        </div>
        <!-- 內容 -->
        <div
          class="flex grow items-center px-6 border-l border-myBrown/20"
          :class="{ 'py-8': item.thirdPhoto === '.' }"
        >
          <p v-html="item.main"></p>
        </div>
        <!-- 圖片 -->
        <div
          v-if="item.thirdPhoto !== '.'"
          class="shrink-0 w-64 h-64 border-l border-myBrown/20"
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