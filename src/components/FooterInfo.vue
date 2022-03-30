<template>
  <div class="flex flex-col py-3 px-16 bg-myBrown md:grid md:grid-cols-2 md:py-1">
    <div class="flex flex-col justify-evenly md:flex-row md:justify-between md:items-center">
      <div class="my-2 h-10">
        <img
          class="w-full h-full"
          src="@img/Logo-footer.svg"
          alt="footer logo"
        >
      </div>
      <div class="flex flex-col text-center text-white md:grid md:grid-cols-4 md:grid-rows-1 md:gap-4 md:mr-4">
        <router-link
          to=""
          class="block py-3 text-sm border-y border-white md:py-2 md:w-auto md:border-none"
        >
          關於切切
        </router-link>
        <router-link
          to=""
          class="block py-3 text-sm border-b border-white md:py-2 md:w-auto md:border-none"
        >
          隱私政策
        </router-link>
        <router-link
          to=""
          class="block py-3 text-sm border-b border-white md:py-2 md:w-auto md:border-none"
        >
          幫助中心
        </router-link>
        <a
          href="javascript:;"
          class="block py-3 text-sm border-b border-white md:py-2 md:w-auto md:border-none"
        >關於火箭隊</a>
      </div>
    </div>
    <p class="flex justify-center items-center py-2 text-sm font-thin tracking-wider text-white md:justify-end md:py-0">
      &copy; 2022 白洞白色的明天有限公司 版權所有
    </p>
  </div>
</template>

<script>
export default {
  name: 'FooterInfo',
}
</script>