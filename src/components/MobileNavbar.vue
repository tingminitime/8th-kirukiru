<template>
  <!-- Mask -->
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="showNavbar"
      class="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm transition-all duration-300"
      @click="dropToggle"
    ></div>
  </transition>
  <!-- Mobile Nav -->
  <div
    class="overflow-x-hidden overflow-y-auto fixed z-30 pt-[72px] shadow-xl transition-all duration-200 md:hidden"
    :class="[ showNavbar ? 'translate-x-0' : '-translate-x-full' ]"
  >
    <div class="flex flex-col justify-between max-w-xs h-[calc(100vh-72px)] bg-gray-200">
      <ul class="flex flex-col">
        <li>
          <a
            href="#"
            class="block relative before:absolute before:bottom-0 before:left-1/2 py-6 px-10 before:w-10/12 before:h-[2px] text-xl font-bold text-myBrown before:bg-myYellow bg-transparent focus:bg-myYellow/20 transition-all before:-translate-x-1/2"
            aria-current="page"
          >切切分類</a>
        </li>
        <li>
          <a
            href="#"
            class="block relative before:absolute before:bottom-0 before:left-1/2 py-6 px-10 before:w-10/12 before:h-[2px] text-xl font-bold text-myBrown before:bg-myYellow bg-transparent focus:bg-myYellow/20 transition-all before:-translate-x-1/2"
            aria-current="page"
          >搜尋切切</a>
        </li>
        <li>
          <a
            href="#"
            class="block relative before:absolute before:bottom-0 before:left-1/2 py-6 px-10 before:w-10/12 before:h-[2px] text-xl font-bold text-myBrown before:bg-myYellow bg-transparent focus:bg-myYellow/20 transition-all before:-translate-x-1/2"
            aria-current="page"
          >編輯精選</a>
        </li>
        <li>
          <a
            href="#"
            class="block relative before:absolute before:bottom-0 before:left-1/2 py-6 px-10 before:w-10/12 before:h-[2px] text-xl font-bold text-myBrown before:bg-myYellow bg-transparent focus:bg-myYellow/20 transition-all before:-translate-x-1/2"
            aria-current="page"
          >關於切切</a>
        </li>
      </ul>
      <div class="flex flex-col py-6 px-10">
        <div class="mx-auto mb-4">
          <img
            src="@img/Logo-Simple-white.svg"
            alt="Mobile navbar footer logo"
          >
        </div>
        <p class="text-xs text-myBrown">
          &copy; 2022 白洞白色的明天有限公司 版權所有
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    showNavbar: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['drop-close'],
  methods: {
    dropToggle() {
      this.$emit('drop-close', false)
    }
  },
}
</script>