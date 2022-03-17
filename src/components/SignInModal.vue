<template>
  <div class="overflow-hidden w-screen h-screen bg-white ring-myBrown md:w-96 md:h-fit md:rounded-xl md:ring-2 md:shadow-xl md:drop-shadow-2xl">
    <div class="py-8 border-b-myBrown md:py-4 md:bg-myYellow md:border-b-2">
      <h1 class="text-2xl font-bold text-center text-myBrown select-none md:text-3xl">
        切切會員登入
      </h1>
    </div>
    <div class="px-10 pt-10 pb-6 bg-white">
      <v-form
        :validation-schema="schema"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit"
      >
        <!-- 帳號欄位 -->
        <InputText
          name="username"
          type="text"
          label="帳號"
          placeholder="帳號"
          class="mb-8"
          :default-value="username"
          :init-value="true"
          success-message=""
          @update:model-value="usernameChange"
        ></InputText>
        <!-- 密碼欄位 -->
        <InputText
          name="password"
          :type="showPassword ? 'text' : 'password'"
          label="密碼"
          placeholder="密碼"
          class="mb-2"
          success-message=""
        ></InputText>
        <div class="flex justify-end mb-6">
          <button
            type="button"
            class="flex gap-2 items-center text-sm text-myBrown"
            @click="showPassword = !showPassword"
          >
            <span class="text-sm material-icons">
              visibility
            </span>
            <span>{{ showPassword ? '隱藏' : '顯示' }}密碼</span>
          </button>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="rememberMe"
              name="remember-me"
              type="checkbox"
              class="w-4 h-4 text-myBrown rounded border-gray-300 focus:ring-myYellow form-checkbox"
            >
            <label
              for="remember-me"
              class="block ml-2 text-sm font-bold text-myBrown"
            > 記住帳號 </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-bold text-myBrown hover:text-myYellow"
            > 忘記密碼 ? </a>
          </div>
        </div>

        <div class="flex flex-col justify-center items-center mt-12">
          <button
            type="submit"
            class="relative text-white hover:text-myYellow bg-myYellow hover:bg-transparent focus:outline-none hover:ring-2 focus:ring hover:ring-myYellow focus:ring-myYellow/80 focus:ring-offset-2 button-lg"
          >
            <ButtonLoadingSpin :show="signInProcess"></ButtonLoadingSpin>
            <span>{{ signInProcess ? '登入中...' : '登入' }}</span>
          </button>
          <router-link
            class="py-1 px-4 mt-4 text-lg font-bold text-center text-myBrown underline underline-offset-4 md:hover:underline"
            :to="{ name: 'SignUp' }"
          >
            立即註冊 !
          </router-link>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import InputText from '@/components/InputText.vue'
import ButtonLoadingSpin from '@/components/ButtonLoadingSpin.vue'
import * as Yup from 'yup'
import { setLocale } from 'yup'
import { mapMutations } from 'vuex'
import { userSignIn } from '@api'

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
  name: 'SignInModal',
  components: {
    InputText,
    ButtonLoadingSpin,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    const schema = Yup.object().shape({
      'username': Yup.string().required(),
      'password': Yup.string().min(6).required(),
    })

    return {
      schema,
      showPassword: false,
      username: '',
      rememberMe: false,
      signInProcess: false,
    }
  },
  created() {
    const rememberAccount = localStorage.getItem('userAccount')
    console.log(rememberAccount)
    if (rememberAccount) {
      this.username = rememberAccount
      this.rememberMe = true
    }
  },
  methods: {
    onSubmit(data) {
      this.signInProcess = true

      console.log(JSON.stringify(data, null, 2))
      if (this.rememberMe) {
        localStorage.setItem('userAccount', this.username)
      } else {
        localStorage.removeItem('userAccount')
      }

      userSignIn(data)
        .then(res => {
          console.log(res)
          this.signInProcess = false
        })
        .catch(error => {
          console.log(error)
          this.signInProcess = false
        })
    },
    onInvalidSubmit(val) {
      console.log(val)
    },
    usernameChange(val) {
      this.username = val
    },
    goRegister() {
      this.CLOSE_LOGIN_MODAL()
      this.OPEN_REGISTER_MODAL()
    },
  }
}
</script>