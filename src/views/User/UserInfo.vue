<template>
  <div class="w-full">
    <h2 class="mb-8 text-2xl font-bold text-myBrown">
      個人資料
    </h2>
    <!-- 帳號 -->
    <div class="flex items-center py-4 text-myBrown border-b border-myBrown">
      <div class="w-1/4 font-bold">
        帳號
      </div>
      <div>
        <span>{{ userInfo.Username }}</span>
      </div>
    </div>
    <!-- 變更密碼 -->
    <div class="py-12 border-b border-myBrown">
      <div class="mb-5 w-1/4 font-bold text-myBrown">
        變更密碼
      </div>
      <div class="flex flex-col gap-6">
        <v-form
          :validation-schema="passwordSchema"
          @submit="onPasswordSubmit"
          @invalid-submit="onPasswordInvalidSubmit"
        >
          <!-- 目前密碼 -->
          <div class="flex text-myBrown">
            <span class="w-1/4">目前密碼</span>
            <FormInputText
              name="user-current-password"
              type="password"
              label="目前密碼"
              placeholder="目前密碼"
              class="mb-10"
              success-message=""
              input-border="focus:ring-2 focus:ring-myYellow"
            ></FormInputText>
          </div>
          <!-- 輸入新密碼 -->
          <div class="flex text-myBrown">
            <span class="w-1/4">輸入新密碼</span>
            <FormInputText
              name="user-new-password"
              type="password"
              label="新密碼"
              placeholder="新密碼"
              class="mb-10"
              success-message=""
              input-border="focus:ring-2 focus:ring-myYellow"
            ></FormInputText>
          </div>
          <!-- 再次輸入 -->
          <div class="flex text-myBrown">
            <span class="w-1/4">再次輸入</span>
            <FormInputText
              name="user-confirm-new-password"
              type="password"
              label="再次輸入密碼"
              placeholder="再次輸入密碼"
              class="mb-10"
              success-message=""
              input-border="focus:ring-2 focus:ring-myYellow"
            ></FormInputText>
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="userPageButton"
            >
              確認變更
            </button>
          </div>
        </v-form>
      </div>
    </div>
    <!-- 變更Email -->
    <div class="py-12">
      <div class="flex flex-col gap-6">
        <!-- E-mail -->
        <div class="flex items-center text-myBrown">
          <div class="w-1/4 font-bold">
            E-mail
          </div>
          <div>
            <span>{{ userInfo.Email }}</span>
          </div>
        </div>
        <v-form
          v-show="isShowEmailInput"
          :validation-schema="emailSchema"
          @submit="onEmailSubmit"
          @invalid-submit="onEmailInvalidSubmit"
        >
          <!-- 輸入Email -->
          <div class="flex gap-3 text-myBrown">
            <FormInputText
              name="user-new-email"
              type="email"
              label="Email"
              placeholder="Email"
              class="w-full"
              success-message=""
              input-border="focus:ring-2 focus:ring-myYellow"
            ></FormInputText>
            <div class="text-center">
              <button
                type="submit"
                class="userPageButton"
              >
                確認更改
              </button>
            </div>
          </div>
        </v-form>
        <div class="text-center">
          <button
            type="submit"
            class="userPageButton"
            @click="toggleChangeEmail"
          >
            更改 E-mail
          </button>
        </div>
      </div>
    </div>
    <AlertModal
      v-bind="alertInfo"
    ></AlertModal>
  </div>
</template>

<script>
import FormInputText from '@/components/utils/FormInputText.vue'
import AlertModal from '@/components/utils/AlertModal.vue'
import * as Yup from 'yup'
import {
  userChangePassword,
  userChangeEmail,
} from '@api'
import { mapState } from 'vuex'

export default {
  name: 'UserInfo',
  components: {
    FormInputText,
    AlertModal,
  },
  emits: ['get-info'],
  data() {
    const passwordSchema = Yup.object().shape({
      // 'user-email': Yup.string().email().required(),
      'user-current-password': Yup.string().min(6).required(),
      'user-new-password': Yup.string().min(6).required(),
      'user-confirm-new-password': Yup.string().required().oneOf([Yup.ref('user-new-password'), null], '密碼需一致 !'),
    })

    const emailSchema = Yup.object().shape({
      'user-new-email': Yup.string().email().required(),
    })

    return {
      passwordSchema,
      emailSchema,
      alertInfo: null,
      isShowEmailInput: false,
    }
  },
  computed: {
    ...mapState([
      'userInfo',
    ])
  },
  methods: {
    // 變更密碼送出
    onPasswordSubmit(values) {
      // console.log(JSON.stringify(values, null, 2))
      const data = {
        Username: this.userInfo.Username,
        O_Password: values['user-current-password'],
        N_Password: values['user-new-password'],
      }
      userChangePassword(data).then(res => {
        if (res.data.success) {
          this.alertInfo = {
            message: '密碼修改成功，請重新登入!',
            confirmMode: 'replace',
            confirmTodo: { name: 'SignIn' },
            messageClass: 'text-lg font-bold text-myBrown md:text-xl',
            showCancel: false,
          }
          this.signOut()
          this.$store.commit('SHOW_ALERT')
        } else {
          this.$notify({
            group: 'error',
            title: res.data.message
          })
        }
      }).catch(error => console.error(error))
    },
    // 變更密碼表單驗證失敗
    onPasswordInvalidSubmit(val) {
      console.log(val)
    },
    // 開關變更 Email 輸入欄位
    toggleChangeEmail() {
      this.isShowEmailInput = !this.isShowEmailInput
    },
    // 變更Email送出
    onEmailSubmit(values) {
      // console.log(JSON.stringify(values, null, 2))
      userChangeEmail(values['user-new-email']).then(res => {
        if (res.data.success) {
          this.$notify({
            group: 'success',
            title: 'Email 更新成功'
          })
          // this.getNewUserInfo()
          this.$emit('get-info')
          this.toggleChangeEmail()
        } else {
          this.$notify({
            group: 'error',
            title: res.data.message
          })
        }
      }).catch(error => console.error(error))
    },
    // 變更Email表單驗證失敗
    onEmailInvalidSubmit(val) {
      console.log(val)
    },
    signOut() {
      localStorage.removeItem('kirukiruToken')
      this.$store.commit('SIGN_OUT')
    },
    // 取得新的 Email
    getNewUserInfo() {
      getUserInfo().then(res => {
        console.log('重新取得使用者資訊: ', res)
        if (res.data.success) {
          this.$store.commit('SET_USER_INFO', res.data.data)
        } else {
          console.log('驗證過期，請重新登入 !')
          localStorage.removeItem('kirukiruToken')
          this.$router.push({ name: 'SignIn' })
        }
      })
      .catch(error => {
        this.$notify({
          group: "error",
          title: "Error",
          text: `${error}`
        }, 2500)
        this.$router.push({ name: 'HomePage' })
      })
    },
  },
}
</script>