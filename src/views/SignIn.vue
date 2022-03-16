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
        <component :is="'SignInModal'"></component>
      </Transition>
    </div>
    <div class="md:grid md:grid-rows-2 md:grid-flow-col md:gap-32">
      <div class="flex items-end">
        <div class="hidden relative md:block">
          <div class="absolute top-0 right-0 text-4xl font-bold text-myBrown select-none">
            嗨 !
          </div>
          <img
            class="h-full select-none"
            src="@img/login-sayhi.svg"
            alt="hi"
          >
          <div class="absolute bottom-0 left-0 text-sm text-myYellow translate-y-full">
            這一巴掌下去，你可能會死。
          </div>
        </div>
      </div>
      <div class="hidden md:block">
        <p class="px-8 text-4xl font-bold leading-tight text-myBrown">
          你的步驟生活<br>寫作平台。
        </p>
      </div>
    </div>
  </div>
  <div class="hidden absolute top-1/2 left-1/2 -z-10 w-[60vw] max-w-screen-md h-[70vh] rounded-tl-[240px] rounded-tr-[80px] rounded-br-[240px] rounded-bl-[80px] border-2 border-myBrown -translate-x-1/2 -translate-y-1/2 md:block md:bg-myYellow"></div>
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