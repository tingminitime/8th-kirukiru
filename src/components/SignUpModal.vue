<template>
  <div
    v-invalid="isInvalidAniProcess"
    class="overflow-hidden h-screen ring-myBrown md:w-96 md:h-auto md:rounded-xl md:ring-2 md:shadow-xl md:drop-shadow-2xl"
    @animationend.stop="animationEndHandler"
  >
    <div class="py-6 border-b-myBrown md:py-4 md:bg-myYellow md:border-b-2">
      <h1 class="text-2xl font-bold text-center text-myBrown select-none">
        切切會員註冊
      </h1>
    </div>
    <div class="overflow-x-hidden h-[75vh] bg-myGray md:h-[60vh] ">
      <div class="px-10 pb-6 md:pt-10 md:pb-8">
        <v-form
          :validation-schema="schema"
          @submit="onSubmit"
          @invalid-submit="onInvalidSubmit"
        >
          <!-- Email -->
          <FormInputText
            name="register-email"
            type="email"
            label="Email"
            placeholder="Email"
            class="mb-10"
            success-message=""
          ></FormInputText>
          <!-- 暱稱 -->
          <FormInputText
            name="register-name"
            type="text"
            label="暱稱"
            placeholder="暱稱"
            class="mb-10"
            success-message=""
          ></FormInputText>
          <!-- 帳號 -->
          <FormInputText
            name="register-username"
            type="text"
            label="帳號"
            placeholder="帳號"
            class="mb-10"
            success-message=""
          ></FormInputText>
          <!-- 密碼 -->
          <FormInputText
            name="register-password"
            type="password"
            label="密碼"
            placeholder="密碼"
            class="mb-10"
            success-message=""
          ></FormInputText>
          <!-- 再次輸入密碼 -->
          <FormInputText
            name="register-confirm_password"
            type="password"
            label="再次輸入密碼"
            placeholder="再次輸入密碼"
            class="mb-10"
            success-message=""
          ></FormInputText>
          <!-- 選擇興趣 -->
          <div class="relative mb-8">
            <v-field
              v-slot="{ field, errorMessage }"
              v-model="interest"
              name="register-articlecategoryId"
            >
              <FormInputSelect
                :options="interestList"
                v-bind="field"
                key-prop="Name"
                label-prop="Name"
                default-text="請選擇一項興趣主題"
              ></FormInputSelect>
              <span class="absolute -bottom-6 left-0 m-0 text-sm text-red-500">{{ errorMessage }}</span>
            </v-field>
          </div>
          <!-- 同意選項 -->
          <div class="relative my-4">
            <v-field
              v-slot="{ errorMessage }"
              v-model="agreeTerms"
              name="register-agree"
            >
              <SwitchGroup>
                <div class="flex items-center">
                  <SwitchLabel class="w-48 select-none">
                    <span class="font-bold text-myBrown">
                      您是否同意 
                      <a
                        href="javascript:;"
                        class="text-xl hover:text-myYellow underline underline-offset-4"
                      >
                        切切規範
                      </a> ?
                    </span>
                  </SwitchLabel>
                  <Switch
                    v-model="agreeTerms"
                    :class="agreeTerms ? 'bg-myYellow' : 'bg-white'"
                    class="mySwitchBar"
                  >
                    <span class="sr-only">您是否同意切切規範</span>
                    <span
                      :class="agreeTerms ? 'translate-x-8' : 'translate-x-0'"
                      class="mySwitchButton"
                    ></span>
                  </Switch>
                </div>
              </SwitchGroup>
              <span class="absolute top-1/2 -right-4 m-0 text-sm text-red-500 -translate-x-full -translate-y-1/2">{{ errorMessage }}</span>
            </v-field>
          </div>
          <!-- 電子信 -->
          <div class="my-4">
            <SwitchGroup>
              <div class="flex items-center">
                <SwitchLabel class="w-48 select-none">
                  <span class="font-bold text-myBrown">您是否願意收到電子信 ?</span>
                </SwitchLabel>
                <Switch
                  v-model="receiveMail"
                  :class="receiveMail ? 'bg-myYellow' : 'bg-white'"
                  class="mySwitchBar"
                >
                  <span class="sr-only">您是否願意收到電子信</span>
                  <span
                    :class="receiveMail ? 'translate-x-8' : 'translate-x-0'"
                    class="mySwitchButton"
                  ></span>
                </Switch>
              </div>
            </SwitchGroup>
          </div>
          <!-- 錯誤訊息 -->
          <div class="flex justify-center py-2">
            <span
              v-if="signUpErrorMsg"
              class="text-red-500"
            >{{ signUpErrorMsg }}</span>
          </div>
          <!-- 註冊按鈕 -->
          <div class="flex flex-col justify-center items-center mt-2">
            <button
              type="submit"
              class="relative button-lg"
              :class="[ agreeTerms ? 'myButtonValid myButtonValidHover' : 'myButtonInvalid' ]"
              :disabled="!agreeTerms"
            >
              <LoadingSpin
                class="absolute top-3 left-5 w-5 h-5 text-white align-middle"
                :show="signUpProcess"
              ></LoadingSpin>
              <span>{{ signUpProcess ? '請稍後...' : '註冊' }}</span>
            </button>
          </div>
          <p class="block mt-8 font-bold text-center text-myBrown md:hidden">
            已經有帳號了 ? 
            <router-link
              class="text-xl hover:text-black"
              :to="{ name: 'SignIn' }"
            >
              <span class="inline-block underline underline-offset-4">點我登入</span><span class="align-sub material-icons">arrow_forward</span>
            </router-link>
          </p>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import FormInputText from '@/components/utils/FormInputText.vue'
import FormInputSelect from '@/components/utils/FormInputSelect.vue'
import LoadingSpin from '@/components/utils/LoadingSpin.vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { mapMutations } from 'vuex'
import * as Yup from 'yup'
import { setLocale } from 'yup'
import { getInterestList, userSignUp } from '@api'

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
  name: 'SignUpModal',
  components: {
    FormInputText,
    FormInputSelect,
    LoadingSpin,
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    const schema = Yup.object().shape({
      'register-email': Yup.string().email().required(),
      'register-name': Yup.string().required(),
      'register-username': Yup.string().required(),
      'register-password': Yup.string().min(6).required(),
      'register-confirm_password': Yup.string().required().oneOf([Yup.ref('register-password'), null], '密碼需一致 !'),
      'register-articlecategoryId': Yup.object().shape().nullable().required('請至少選擇一項興趣 !'),
      'register-agree': Yup.bool().oneOf([true], '必填 !')
    })

    return {
      schema,
      interest: null,
      interestList: [],
      params: {
        userName: '',
        passWord: '',
        name: '',
        email: '',
        articlecategoryId: null,
      },
      agreeTerms: false,
      receiveMail: false,
      isFormValid: false,
      isInvalidAniProcess: null,
      signUpProcess: false,
      signUpErrorMsg: '',
    }
  },
  mounted() {
    getInterestList()
      .then(res => {
        this.interestList = res.data
      })
      .catch(error => console.log(error))
  },
  methods: {
    onSubmit(values) {
      this.isFormValid = true
      console.log(JSON.stringify(values, null, 2))

      const obj = {}
      for(const key in values) {
        const keySplit = key.includes('-') ? key.split('-') : key
        const newKey = keySplit[keySplit.length - 1]
        obj[newKey] = values[key]
      }
      
      const { confirm_password, articlecategoryId, ...rest } = obj
      let data = {
        articlecategoryId: articlecategoryId.Id,
        ...rest
      }
      console.log(data)

      userSignUp(data).then(res => {
        console.log('註冊API(200): ', res)
        if (res.data.success) {
          this.$notify({
            group: "success",
            title: "註冊成功 !",
            text: `${res.data.message}`
          }, 2500)
        } else {
          this.signUpErrorMsg = res.data.message
          this.$notify({
            group: "success",
            title: "註冊失敗 !",
            text: `${res.data.message}`
          }, 2500)
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    onInvalidSubmit(val) {
      console.log(val)
      this.isFormValid = false
      this.isInvalidAniProcess = true
    },
    animationEndHandler() {
      this.isInvalidAniProcess = false
    },
  }
}
</script>