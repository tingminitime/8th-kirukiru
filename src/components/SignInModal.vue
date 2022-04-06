<template>
  <div
    v-invalid="isInvalidAniProcess"
    class="overflow-hidden h-screen ring-myBrown md:w-96 md:h-fit md:rounded-xl md:ring-2 md:shadow-xl md:drop-shadow-2xl"
    @animationend.stop="animationEndHandler"
  >
    <div class="py-8 border-b-myBrown md:py-4 md:bg-myYellow md:border-b-2">
      <h1 class="text-2xl font-bold text-center text-myBrown select-none md:text-3xl">
        切切會員登入
      </h1>
    </div>
    <div class="px-10 pb-6 bg-myGray md:pt-10">
      <v-form
        :validation-schema="schema"
        @submit="onSubmit"
        @invalid-submit="onInvalidSubmit"
      >
        <!-- 帳號欄位 -->
        <FormInputText
          :focus="true"
          name="username"
          type="text"
          label="帳號"
          placeholder="帳號"
          class="mb-8"
          :default-value="username"
          :init-value="true"
          success-message=""
          @update:model-value="usernameChange"
        ></FormInputText>
        <!-- 密碼欄位 -->
        <FormInputText
          name="password"
          :type="showPassword ? 'text' : 'password'"
          label="密碼"
          placeholder="密碼"
          class="mb-2"
          success-message=""
        ></FormInputText>
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
              class="block ml-2 text-sm font-medium text-myBrown"
            > 記住帳號 </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-myBrown hover:text-myYellow"
            > 忘記密碼 ? </a>
          </div>
        </div>
        <!-- 錯誤訊息 -->
        <div class="flex justify-center py-6">
          <span
            v-if="signInErrorMsg"
            class="text-red-500"
          >{{ signInErrorMsg }}</span>
        </div>
        <!-- 登入 / 註冊 按鈕 -->
        <div class="flex flex-col justify-center items-center">
          <button
            type="submit"
            class="relative myButtonValid button-lg"
            :class="[ signInProcess ? '' : 'myButtonValidHover' ]"
            :disabled="signInProcess"
          >
            <LoadingSpin
              class="absolute top-3 left-5 w-5 h-5 text-white align-middle"
              :show="signInProcess"
            ></LoadingSpin>
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
import FormInputText from '@/components/utils/FormInputText.vue'
import LoadingSpin from '@/components/utils/LoadingSpin.vue'
import * as Yup from 'yup'
import { setLocale } from 'yup'
import { mapActions, mapMutations } from 'vuex'
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
    FormInputText,
    LoadingSpin,
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
      isInvalidAniProcess: null,
      signInErrorMsg: '',
    }
  },
  created() {
    const rememberAccount = localStorage.getItem('userAccount')
    if (rememberAccount) {
      this.username = rememberAccount
      this.rememberMe = true
    }
  },
  methods: {
    ...mapMutations([
      'SET_TOKEN',
      'SET_USER_INFO',
    ]),
    ...mapActions([
      'GET_KIRU_COLLECTIONS',
      'GET_SUBSCRIBE_LIST',
    ]),
    // 驗證通過，登入
    onSubmit(data) {
      this.signInProcess = true

      if (this.rememberMe) {
        localStorage.setItem('userAccount', this.username)
      } else {
        localStorage.removeItem('userAccount')
      }

      userSignIn(data).then(res => {
        console.log('登入API(200): ', res)
        this.signInProcess = false
        if (res.data.success) {
          this.$notify({
            group: "success",
            title: "登入成功",
            text: `歡迎回來，${res.data.data.Name}`
          }, 3000)
          
          localStorage.setItem('kirukiruToken', res.data.token)
          this.SET_TOKEN(res.data.token)
          this.SET_USER_INFO(res.data.data)
          this.GET_KIRU_COLLECTIONS({ nowpage: 1, showcount: 9999 })
          this.GET_SUBSCRIBE_LIST({ nowpage: 1, showcount: 9999 })
          this.$router.replace(this.$store.state.recordPath)
        } else {
          this.signInErrorMsg = res.data.message
          this.$notify({
            group: "error",
            title: "登入失敗 !",
            text: `${res.data.message}`
          }, 2500)
        }
      })
      .catch(error => {
        console.log(error)
        this.signInProcess = false
        this.$notify({
          group: "error",
          title: "Error",
          text: `${error}`
        }, 2500) 
      })
    },
    onInvalidSubmit(val) {
      console.log(val)
      this.isInvalidAniProcess = true
    },
    usernameChange(val) {
      this.username = val
    },
    goRegister() {
      this.CLOSE_LOGIN_MODAL()
      this.OPEN_REGISTER_MODAL()
    },
    animationEndHandler() {
      this.isInvalidAniProcess = false
    },
  }
}
</script>