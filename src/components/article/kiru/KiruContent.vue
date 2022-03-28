<template>
  <!-- 切切內容 -->
  <ul class="mb-20">
    <li
      v-for="(item, i) in content"
      :key="item.mId"
      class="mb-4"
    >
      <div class="flex border border-myBrown/20">
        <!-- 序號 -->
        <div class="flex justify-center items-center w-16">
          <span class="text-4xl font-bold text-myBrown -translate-y-1.5 md:text-5xl">
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
          class="w-64 h-64 border-l border-myBrown/20"
        >
          <img
            v-src="`https://kirukiru.rocket-coding.com/Pic/${item.thirdPhoto}`"
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