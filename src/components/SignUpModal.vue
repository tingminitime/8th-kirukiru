<template>
  <div
    v-invalid="isInvalidAniProcess"
    class="overflow-hidden h-screen bg-white ring-myBrown drop-shadow-2xl md:w-96 md:h-auto md:rounded-xl md:ring-2 md:shadow-xl"
    @animationend.stop="animationEndHandler"
  >
    <div class="py-6 border-b-myBrown md:py-4 md:bg-myYellow md:border-b-2">
      <h1 class="text-2xl font-bold text-center text-myBrown select-none md:text-3xl">
        切切會員註冊
      </h1>
    </div>
    <div class="overflow-x-hidden h-[75vh] md:h-[60vh]">
      <div class="px-10 pb-6 bg-myGray md:pt-10 md:pb-8">
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
            name="register-account"
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
          <div class="relative mb-12">
            <v-field
              v-slot="{ field, errorMessage }"
              v-model="interest"
              name="register-interest"
            >
              <InputSelect
                :options="interestList"
                v-bind="field"
                key-prop="Name"
                label-prop="Name"
                default-text="請選擇一項興趣主題"
              ></InputSelect>
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
          <!-- 註冊按鈕 -->
          <div class="flex flex-col justify-center items-center mt-8">
            <button
              type="submit"
              class="relative button-lg"
              :class="[ agreeTerms ? 'myButtonValid myButtonValidHover' : 'myButtonInvalid' ]"
              :disabled="!agreeTerms"
            >
              <ButtonLoadingSpin :show="signUpProcess"></ButtonLoadingSpin>
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
import InputSelect from '@/components/InputSelect.vue'
import ButtonLoadingSpin from '@/components/utils/ButtonLoadingSpin.vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { mapMutations } from 'vuex'
import * as Yup from 'yup'
import { setLocale } from 'yup'
import { getInterestList } from '@api'

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
    InputSelect,
    ButtonLoadingSpin,
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
      'register-account': Yup.string().required(),
      'register-password': Yup.string().min(6).required(),
      'register-confirm_password': Yup.string().required().oneOf([Yup.ref('register-password'), null], '密碼需一致 !'),
      'register-interest': Yup.object().shape().nullable().required('請至少選擇一項興趣 !'),
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