<template>
  <div
    class="flex fixed top-0 left-0 z-50 justify-center items-center w-screen h-full shadow-xl"
    :class="[ isOpen ? 'block' : 'hidden' ]"
  >
    <div
      class="flex justify-center items-center"
    >
      <div class="overflow-hidden pb-12 mx-auto w-96 bg-white rounded-3xl shadow-xl">
        <div class="relative py-4 bg-myYellow">
          <h1 class="text-2xl font-bold text-center text-myBrown select-none">
            會員登入
          </h1>
          <button
            type="button"
            class="inline-block absolute top-1/2 right-2 p-2 leading-none align-middle -translate-y-1/2"
            @click="closeModal"
          >
            <span class="font-bold material-icons">
              close
            </span>
          </button>
        </div>
        <div class="flex justify-center h-48">
          <img
            src="@img/login-sayhi.png"
            alt="hi"
          >
        </div>
        <div class="px-10 bg-white">
          <form method="POST">
            <div class="relative mb-10">
              <input
                id="account"
                name="account"
                type="text"
                class="peer w-full h-10 text-lg tracking-wide text-gray-900 placeholder:text-transparent border-b-2 border-myBrown focus:border-myYellow focus:outline-none placeholder:select-none"
                placeholder="account"
              >
              <label
                for="email"
                class="absolute -top-3.5 peer-placeholder-shown:top-2 peer-focus:-top-3.5 left-0 text-sm peer-placeholder-shown:text-base peer-focus:text-sm font-bold text-myBrown peer-placeholder-shown:text-myBrown/50 peer-focus:text-myBrown transition-all"
              >帳號</label>
            </div>
            <div class="relative mb-4">
              <input
                id="password"
                type="password"
                name="password"
                class="peer w-full h-10 tracking-widest text-gray-900 placeholder:text-transparent border-b-2 border-myBrown focus:border-myYellow focus:outline-none select-none"
                placeholder="Password"
              >
              <label
                for="password"
                class="absolute -top-3.5 peer-placeholder-shown:top-2 peer-focus:-top-3.5 left-0 text-sm peer-placeholder-shown:text-base peer-focus:text-sm font-bold text-myBrown peer-placeholder-shown:text-myBrown/50 peer-focus:text-myBrown transition-all"
              >密碼</label>
            </div>

            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="w-4 h-4 text-myBrown rounded border-gray-300 focus:ring-myYellow form-checkbox"
                >
                <label
                  for="remember-me"
                  class="block ml-2 text-sm text-gray-900"
                > 記住帳號 </label>
              </div>

              <div class="text-sm">
                <a
                  href="#"
                  class="font-bold text-myBrown hover:text-myYellow"
                > 忘記密碼 ? </a>
              </div>
            </div>

            <div>
              <input
                type="button"
                value="登入"
                class="block py-2 px-4 mt-8 w-full text-xl font-bold text-center text-white hover:text-myYellow bg-myYellow hover:bg-transparent rounded focus:outline-none hover:ring-4 focus:ring hover:ring-myYellow focus:ring-myYellow/80 focus:ring-offset-2 cursor-pointer"
              >
              <p class="mt-4 text-lg font-bold text-center text-myBrown">
                <button
                  type="button"
                  class="py-1 px-4 hover:underline underline-offset-4"
                >
                  立即註冊 !
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'LoginModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('CLOSE_LOGIN_MODAL')
    }
  }
}
</script>