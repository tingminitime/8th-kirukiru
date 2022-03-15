<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0 translate-x-48"
    enter-to-class="transform opacity-100 translate-x-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="transform opacity-100 translate-x-0"
    leave-to-class="transform opacity-0 -translate-x-48"
  >
    <div
      v-if="isOpen"
      class="flex fixed top-0 left-0 z-50 justify-center items-center w-screen h-full"
    >
      <div
        class="flex justify-center items-center drop-shadow-2xl"
      >
        <div class="overflow-hidden pb-8 mx-auto w-96 bg-white rounded-3xl shadow-xl">
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
              <InputText
                id="login-account"
                name="login-account"
                placeholder="帳號"
                class="mb-8"
              ></InputText>

              <InputText
                id="login-password"
                name="login-password"
                placeholder="密碼"
                class="mb-4"
              ></InputText>

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
                  class="block py-2 px-4 mt-12 w-full text-xl font-bold text-center text-white hover:text-myYellow bg-myYellow hover:bg-transparent rounded focus:outline-none hover:ring-4 focus:ring hover:ring-myYellow focus:ring-myYellow/80 focus:ring-offset-2 cursor-pointer"
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
  </transition>
</template>

<script>
import InputText from '@/components/InputText.vue'
import * as Yup from 'yup'

export default {
  name: 'LoginModal',
  components: {
    InputText,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('CLOSE_LOGIN_MODAL')
    },
  }
}
</script>