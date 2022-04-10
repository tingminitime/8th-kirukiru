<template>
  <div
    v-invalid="isInvalidAniProcess"
    class="overflow-hidden h-screen ring-myBrown md:w-96 md:h-fit md:rounded-xl md:ring-2 md:shadow-xl md:drop-shadow-2xl"
    @animationend.stop="animationEndHandler"
  >
    <div class="py-8 border-b-myBrown md:py-4 md:bg-myYellow md:border-b-2">
      <h1 class="text-2xl font-bold text-center text-myBrown select-none md:text-3xl">
        忘記密碼 ? <s class="text-base">笑死</s>
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
          name="forgot-username"
          type="text"
          label="帳號"
          placeholder="帳號"
          class="mb-8"
          :default-value="username"
          :init-value="true"
          success-message=""
          @update:model-value="usernameChange"
        ></FormInputText>
        <!-- Email -->
        <FormInputText
          ref="emailInput"
          :focus="true"
          name="forgot-email"
          type="email"
          label="Email"
          placeholder="Email"
          class="mb-4"
          success-message=""
        ></FormInputText>
        <!-- 提示訊息 -->
        <div class="flex justify-center py-6">
          <span
            v-if="signInErrorMsg"
            class="text-red-500"
          >{{ signInErrorMsg }}</span>
          <span
            v-else-if="isComplete"
            class="text-red-500"
          >已將新密碼寄出，請確認您的信箱 !</span>
        </div>
        <!-- 取得新密碼 -->
        <div class="flex flex-col justify-center items-center">
          <button
            type="submit"
            class="relative button-lg"
            :class="[ !isComplete ? 'myButtonValid myButtonValidHover' : 'myButtonInvalid' ]"
            :disabled="isComplete"
          >
            <LoadingSpin
              class="absolute top-3 left-5 w-5 h-5 text-white align-middle"
              :show="isLoading"
            ></LoadingSpin>
            <span>{{ isLoading ? '請稍後...' : '取得新密碼' }}</span>
          </button>
          <router-link
            class="py-1 px-4 mt-4 text-lg font-bold text-center text-myBrown underline underline-offset-4 md:hover:underline"
            :to="{ name: 'SignIn' }"
          >
            點我登入
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
import { userForgotPassword } from '@api'

setLocale({
  mixed: {
    default: '無效的輸入',
    required: '必填欄位'
  },
  string: {
    min: '長度不可小於 ${min}',
    email: '須符合 Email 格式 !'
  }
})

export default {
  name: 'ForgotPasswordModal',
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
      'forgot-username': Yup.string().required(),
      'forgot-email': Yup.string().email().required(),
    })

    return {
      schema,
      username: '',
      email: '',
      isLoading: false,
      isInvalidAniProcess: null,
      signInErrorMsg: '',
      isComplete: false,
    }
  },
  created() {
    const rememberAccount = localStorage.getItem('userAccount')
    if (rememberAccount) {
      this.username = rememberAccount
    }
  },
  methods: {
    // 驗證通過，登入
    onSubmit(data) {
      this.isLoading = true
      const parmas = {
        username: data['forgot-username'],
        eMail: data['forgot-email']
      }

      userForgotPassword(parmas).then(res => {
        if (res.data.success) {
          this.$notify({
            group: "success",
            title: "已將新密碼寄至您的信箱",
          }, 3000)
          this.isComplete = true
        } else {
          this.signInErrorMsg = res.data.message
          this.$notify({
            group: "error",
            title: "取得失敗 !",
            text: `${res.data.message}`
          }, 2500)
        }
        this.$refs.emailInput.inputValue = ''
        this.isLoading = false
      })
      .catch(error => {
        console.log(error)
        this.isLoading = false
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
    animationEndHandler() {
      this.isInvalidAniProcess = false
    },
  }
}
</script>