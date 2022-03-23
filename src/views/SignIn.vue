<template>
  <div class="overflow-hidden h-[calc(100vh-72px)] max-h-[calc(100vh-72px)] md:grid md:grid-cols-2 md:gap-11">
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
        <component :is="'SignInModal'"></component>
      </Transition>
    </div>
    <div class="-z-10 py-4 my-auto">
      <div class="hidden overflow-hidden min-w-[464px] max-w-[500px] rounded-xl border-2 -translate-x-1/2 md:block border-myBrown">
        <img
          class="block object-cover w-full h-full scale-105"
          src="@img/signin-bg.svg"
          alt="signin background image"
        >
      </div>
    </div>
  </div>
</template>

<script>
import SignInModal from '@/components/SignInModal.vue'

export default {
  name: 'SignIn',
  components: {
    SignInModal,
  }
}
</script>