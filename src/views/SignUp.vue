<template>
  <div class="grid overflow-hidden grid-cols-2 gap-11 h-[calc(100vh-72px)]">
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
        <component :is="'SignUpModal'"></component>
      </Transition>
    </div>
    <div class="md:grid md:grid-rows-2 md:grid-flow-col md:gap-32">
      <div class="flex items-end">
        <div class="hidden relative md:block">
          <div class="absolute bottom-1 left-8 text-3xl font-bold text-myBrown translate-y-full select-none">
            填 都填
          </div>
          <img
            class="h-full select-none"
            src="@img/register-sayhi.svg"
            alt="hi"
          >
          <div class="absolute right-0 -bottom-12 text-sm text-myYellow -translate-y-full">
            哩戈共幾百
          </div>
        </div>
      </div>
      <p class="hidden font-bold text-myBrown md:block">
        已經有帳號了 ? 
        <router-link
          class="text-xl hover:text-black"
          :to="{ name: 'SignIn' }"
        >
          <span class="inline-block underline underline-offset-4">點我登入</span><span class="align-sub material-icons">arrow_forward</span>
        </router-link>
      </p>
    </div>
  </div>
  <div class="hidden absolute top-1/2 left-1/2 -z-10 w-[60vw] max-w-screen-md h-[70vh] rounded-tl-[240px] rounded-tr-[80px] rounded-br-[240px] rounded-bl-[80px] border-2 border-myBrown -translate-x-1/2 -translate-y-1/2 md:block md:bg-myYellow"></div>
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