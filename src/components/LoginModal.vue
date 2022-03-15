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
      class="flex fixed top-0 left-0 z-50 justify-center items-center w-screen h-full"
    >
      <div
        class="flex justify-center items-center drop-shadow-2xl"
      >
        <div class="overflow-hidden pb-8 mx-auto w-80 bg-white rounded-3xl shadow-xl md:w-96">
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
            <v-form
              :validation-schema="schema"
              @submit="onSubmit"
              @invalid-submit="onInvalidSubmit"
            >
              <InputText
                name="login-account"
                type="text"
                label="帳號"
                placeholder="帳號"
                class="mb-10"
                success-message=""
              ></InputText>

              <InputText
                name="login-password"
                type="text"
                label="密碼"
                placeholder="密碼"
                class="mb-10"
                success-message=""
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

              <div class="flex flex-col justify-center items-center">
                <button
                  type="submit"
                  class="block py-2 px-4 mt-12 w-48 text-xl font-bold text-center text-white hover:text-myYellow bg-myYellow hover:bg-transparent rounded focus:outline-none hover:ring-4 focus:ring hover:ring-myYellow focus:ring-myYellow/80 focus:ring-offset-2 cursor-pointer"
                >
                  登入
                </button>
                <button
                  type="button"
                  class="py-1 px-4 mt-4 text-lg font-bold text-center text-myBrown hover:underline underline-offset-4"
                  @click="goRegister"
                >
                  立即註冊 !
                </button>
              </div>
            </v-form>
          </div>
        </div>
      </div>
    </div> 
  </transition>
</template>

<script>
import InputText from '@/components/InputText.vue'
import * as Yup from 'yup'
import { setLocale } from 'yup'
import { mapMutations } from 'vuex'

setLocale({
  mixed: {
    default: '無效的輸入',
    required: '必填欄位'
  },
  string: {
    min: '長度不可小於 ${min}'
  }
})

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
    const schema = Yup.object().shape({
      'login-account': Yup.string().required(),
      'login-password': Yup.string().min(6).required(),
    })

    return {
      schema,
    }
  },
  methods: {
    onSubmit(values) {
      console.log(JSON.stringify(values, null, 2))
    },
    onInvalidSubmit(val) {
      console.log(val)
    },
    ...mapMutations([
      'OPEN_LOGIN_MODAL',
      'OPEN_REGISTER_MODAL',
      'CLOSE_MASK',
      'CLOSE_LOGIN_MODAL',
    ]),
    closeModal() {
      this.CLOSE_MASK()
      this.CLOSE_LOGIN_MODAL()
    },
    showRegisterModal() {
      this.OPEN_LOGIN_MODAL()
    },
    goRegister() {
      this.CLOSE_LOGIN_MODAL()
      this.OPEN_REGISTER_MODAL()
    },
  }
}
</script>