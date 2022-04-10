<template>
  <div class="overflow-hidden h-[calc(100vh-56px-64px)] max-h-[calc(100vh-56px-64px)] md:grid md:grid-cols-2 md:gap-11">
    <div class="my-auto ml-auto">
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
        <component :is="'ForgotPasswordModal'"></component>
      </Transition>
    </div>
    <div class="-z-10 py-4 my-auto">
      <div class="hidden overflow-hidden min-w-[464px] max-w-[500px] rounded-xl border-2 border-myBrown -translate-x-1/3 md:block">
        <img
          class="block object-cover w-full h-full scale-105"
          src="@img/forgot-bg.svg"
          alt="signin background image"
        >
      </div>
    </div>
  </div>
</template>

<script>
import ForgotPasswordModal from '@/components/sign/ForgotPasswordModal.vue'

export default {
  name: 'ForgotPassword',
  components: {
    ForgotPasswordModal,
  }
}
</script>