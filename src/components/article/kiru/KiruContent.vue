<template>
  <!-- 切切內容 -->
  <div class="pb-6">
    <div class="flex mb-6 border border-myBrown/20">
      <!-- 序號 -->
      <div class="flex justify-center items-center w-16">
        <span class="text-4xl font-bold -translate-y-1.5 md:text-5xl">12</span>
      </div>
      <!-- 內容 -->
      <div class="flex grow items-center px-6 border-x border-myBrown/20">
        <p>在拆水龍頭前，先將家裡的總水源關閉（水塔上或</p>
      </div>
      <!-- 圖片 -->
      <div class="w-64 h-64">
        <img
          v-src="'https://picsum.photos/800/600?random=9'"
          class="object-cover w-full h-full load"
          alt=""
        >
      </div>
    </div>
  </div>

  <div class="pb-6">
    <div class="flex mb-6 border border-myBrown/20">
      <!-- 序號 -->
      <div class="flex justify-center items-center w-16">
        <span class="text-4xl font-bold -translate-y-1.5 md:text-5xl">12</span>
      </div>
      <!-- 內容 -->
      <div
        class="flex grow items-center px-6 border-x border-myBrown/20"
        :class="{ 'py-12': true }"
      >
        <p>在拆水龍頭前，先將家裡的總水源關閉（水塔上或</p>
      </div>
      <!-- 圖片 -->
      <div
        v-if="false"
        class="w-64 h-64"
      >
        <img
          v-src="''"
          class="object-cover w-full h-full load"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KiruContent',
}
</script>