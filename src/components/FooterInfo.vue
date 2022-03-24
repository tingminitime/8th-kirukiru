<template>
  <div class="grid grid-cols-2 py-3 px-16 bg-myBrown">
    <div class="flex justify-between items-center">
      <div class="h-10">
        <img
          class="w-full h-full"
          src="@img/Logo-footer.svg"
          alt="footer logo"
        >
      </div>
      <div class="grid grid-cols-4 gap-4 mr-4 text-center text-white">
        <router-link
          to=""
          class="py-2"
        >
          關於切切
        </router-link>
        <router-link
          to=""
          class="py-2"
        >
          隱私政策
        </router-link>
        <router-link
          to=""
          class="py-2"
        >
          幫助中心
        </router-link>
        <a
          href="javascript:;"
          class="py-2"
        >關於火箭隊</a>
      </div>
    </div>
    <p class="flex justify-end items-center text-sm font-thin tracking-wider text-white">
      &copy; 2022 白洞白色的明天有限公司 版權所有
    </p>
  </div>
</template>

<script>
export default {
  name: 'FooterInfo',
}
</script>