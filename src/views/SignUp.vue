<template>
  <div class="overflow-hidden relative h-[calc(100vh-56px-64px)] md:grid md:grid-cols-2 md:gap-11">
    <div class="z-20 my-auto ml-auto">
      <Transition
        appear
        mode="out-in"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform opacity-0 translate-x-48"
        enter-to-class="transform opacity-100 translate-x-0"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform opacity-100 translate-x-0"
        leave-to-class="transform opacity-0 -translate-x-48"
      >
        <component :is="'SignUpModal'"></component>
      </Transition>
    </div>
    <div class="relative z-10 py-4 my-auto">
      <div class="hidden overflow-hidden min-w-[600px] max-w-[500px]  rounded-xl border-2 border-myBrown -translate-x-1/2 md:flex md:justify-center md:items-center md:max-w-[768px] md:max-h-[75vh]">
        <img
          class="block object-cover w-full h-full scale-105"
          src="@img/signup-bg.svg"
          alt="signin background image"
        >
      </div>
    </div>
    <p class="hidden absolute right-0 bottom-0 z-10 p-2 px-12 w-full font-bold text-right text-myBrown bg-myYellow md:block">
      已經有帳號了 ? 
      <router-link
        class="text-xl hover:text-black"
        :to="{ name: 'SignIn' }"
      >
        <span class="inline-block underline underline-offset-4">點我登入</span><span class="align-sub material-icons">arrow_forward</span>
      </router-link>
    </p>
  </div>
</template>

<script>
import SignUpModal from '@/components/SignUpModal.vue'

export default {
  name: 'SignUp',
  components: {
    SignUpModal,
  },
}
</script>