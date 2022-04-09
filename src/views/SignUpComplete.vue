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
        <div
          class="overflow-hidden h-screen ring-myBrown md:w-96 md:h-auto md:rounded-xl md:ring-2 md:shadow-xl md:drop-shadow-2xl"
        >
          <div class="py-6 border-b-myBrown md:py-4 md:bg-myYellow md:border-b-2">
            <h1 class="text-2xl font-bold text-center text-myBrown select-none">
              會員註冊完成
            </h1>
          </div>
          <div class="py-4 bg-myGray md:py-12">
            <p class="mb-8 text-lg text-center text-myBrown md:mb-12">
              驗證信已寄至信箱<br>請點選信箱內連結
            </p>
            <div class="px-4 md:px-0">
              <router-link
                :to="{ name: 'SignIn' }"
                class="mx-auto myButtonValid button-lg myButtonValidHover"
              >
                完成
              </router-link>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div class="relative z-10 py-4 my-auto">
      <div class="hidden overflow-hidden min-w-[600px] max-w-[500px]  rounded-xl border-2 border-myBrown -translate-x-1/2 md:flex md:justify-center md:items-center md:max-w-[768px] md:max-h-[75vh]">
        <img
          class="block object-cover w-full h-full scale-105"
          src="@img/signup-complete.svg"
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
export default {
  name: 'SignUpComplete',
}
</script>